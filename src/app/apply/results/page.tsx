'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, Loader2, ChevronRight, FileUp } from 'lucide-react';
import Button from '@/components/Button';
import { useAppContext } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';

export default function DocumentUploadPage() {
  const router = useRouter();
  const { 
    formData, 
    updateFormData, 
    saveApplication, 
    setCurrentStep, 
    loanId, 
    secretToken, 
    isLoading 
  } = useAppContext();

  // Set the progress stepper step
  useEffect(() => {
    setCurrentStep(5);
  }, [setCurrentStep]);

  // Document states
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  const [stateIdFile, setStateIdFile] = useState<File | null>(null);
  
  // Upload and DB URLs
  const [studentIdUrl, setStudentIdUrl] = useState<string | null>(null);
  const [stateIdUrl, setStateIdUrl] = useState<string | null>(null);

  // Status and previews
  const [studentIdPreview, setStudentIdPreview] = useState<string | null>(null);
  const [stateIdPreview, setStateIdPreview] = useState<string | null>(null);
  
  const [uploadingStudent, setUploadingStudent] = useState(false);
  const [uploadingState, setUploadingState] = useState(false);
  const [isSubmittingDocs, setIsSubmittingDocs] = useState(false);
  const [docsSubmittedSuccessfully, setDocsSubmittedSuccessfully] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const studentInputRef = useRef<HTMLInputElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);

  // Load existing documents on mount if already uploaded
  useEffect(() => {
    if (loanId && secretToken) {
      fetchExistingDocs();
    }
  }, [loanId, secretToken]);

  const fetchExistingDocs = async () => {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('student_id_url, state_id_url, status')
        .eq('id', loanId)
        .single();

      if (error) throw error;

      if (data) {
        if (data.status === 'pending' || data.status === 'approved' || data.status === 'rejected') {
          setDocsSubmittedSuccessfully(true);
        }

        if (data.student_id_url) {
          setStudentIdUrl(data.student_id_url);
          // Generate signed URL to view
          const { data: signedData } = await supabase.storage
            .from('identity_documents')
            .createSignedUrl(data.student_id_url, 3600);
          if (signedData) setStudentIdPreview(signedData.signedUrl);
        }

        if (data.state_id_url) {
          setStateIdUrl(data.state_id_url);
          // Generate signed URL to view
          const { data: signedData } = await supabase.storage
            .from('identity_documents')
            .createSignedUrl(data.state_id_url, 3600);
          if (signedData) setStateIdPreview(signedData.signedUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching existing documents:', err);
    }
  };

  const handleUploadFile = async (file: File, type: 'student' | 'state') => {
    if (!loanId) {
      setErrorMsg('Application session not initialized. Please go back and save.');
      return;
    }

    const setUploading = type === 'student' ? setUploadingStudent : setUploadingState;
    const setPreview = type === 'student' ? setStudentIdPreview : setStateIdPreview;
    const setDocUrl = type === 'student' ? setStudentIdUrl : setStateIdUrl;

    setUploading(true);
    setErrorMsg(null);

    // Create local object URL for preview if it's an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or other non-image
      setPreview(null);
    }

    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const storagePath = `loans/${loanId}/${type}_id_${Date.now()}.${fileExt}`;

    try {
      // 1. Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('identity_documents')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 2. Save document URL in database
      const dbUpdateField = type === 'student' ? { student_id_url: storagePath } : { state_id_url: storagePath };
      const { error: dbError } = await supabase
        .from('loans')
        .update(dbUpdateField)
        .eq('id', loanId);

      if (dbError) throw dbError;

      // Update state
      setDocUrl(storagePath);
      if (type === 'student') {
        setStudentIdFile(file);
      } else {
        setStateIdFile(file);
      }

      // If it's a PDF, we might generate a temporary signed URL just to verify we can access it
      if (file.type === 'application/pdf') {
        const { data: signedData } = await supabase.storage
          .from('identity_documents')
          .createSignedUrl(storagePath, 3600);
        if (signedData) setPreview(signedData.signedUrl);
      }

    } catch (err: any) {
      console.error(`Upload error for ${type} ID:`, err);
      setErrorMsg(err.message || `Failed to upload ${type === 'student' ? 'Student' : 'State'} ID. Please try again.`);
      setPreview(null);
      setDocUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (type: 'student' | 'state') => {
    const docUrl = type === 'student' ? studentIdUrl : stateIdUrl;
    if (!docUrl) return;

    const setFile = type === 'student' ? setStudentIdFile : setStateIdFile;
    const setPreview = type === 'student' ? setStudentIdPreview : setStateIdPreview;
    const setDocUrl = type === 'student' ? setStudentIdUrl : setStateIdUrl;

    try {
      // 1. Delete from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('identity_documents')
        .remove([docUrl]);

      if (storageError) throw storageError;

      // 2. Set database field to null
      const dbUpdateField = type === 'student' ? { student_id_url: null } : { state_id_url: null };
      const { error: dbError } = await supabase
        .from('loans')
        .update(dbUpdateField)
        .eq('id', loanId);

      if (dbError) throw dbError;

      // Clear states
      setFile(null);
      setPreview(null);
      setDocUrl(null);

    } catch (err: any) {
      console.error(`Delete error for ${type} ID:`, err);
      setErrorMsg(err.message || 'Failed to delete file. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'student' | 'state') => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        handleUploadFile(file, type);
      } else {
        setErrorMsg('Invalid file format. Please upload PNG, JPG, WEBP, or PDF.');
      }
    }
  };

  const handleSubmitAllDocuments = async () => {
    if (!studentIdUrl || !stateIdUrl) {
      setErrorMsg('Please upload both documents before submitting.');
      return;
    }

    setIsSubmittingDocs(true);
    setErrorMsg(null);

    try {
      // Save application with status 'pending' (signifies pending admin ID check)
      const result = await saveApplication({ status: 'pending' });
      if (result.success) {
        setDocsSubmittedSuccessfully(true);
      } else {
        throw new Error('Database save failed');
      }
    } catch (err: any) {
      console.error('Error submitting documents:', err);
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmittingDocs(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow py-20">
        <Loader2 className="w-12 h-12 animate-spin text-secondary-blue mb-4" />
        <p className="text-gray-600 font-medium">Loading your application details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 md:px-20 w-full max-w-5xl mx-auto">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
        
        {docsSubmittedSuccessfully ? (
          /* Confirmation State UI */
          <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100 shadow-sm animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-blue mb-4 tracking-tight leading-tight">
              Application & Documents <span className="text-accent-blue">Submitted!</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              Thank you for verifying your identity. We have received your student ID and state-issued photo ID. 
              Our admin review team will verify them shortly.
            </p>

            <div className="w-full bg-[#f0f4f8] rounded-xl p-6 mb-8 text-left border border-blue-50">
              <h4 className="font-bold text-primary-blue mb-3 text-[15px]">Next Steps:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 font-medium">
                <li>Your application status is now <span className="text-secondary-blue font-bold">Pending Review</span>.</li>
                <li>Keep check of your inbox; we will email you if we need any further details.</li>
                <li>You can resume or view your application anytime using:</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold">Your Access Code:</span>
                  <span className="text-lg font-mono font-bold text-primary-blue">{formData.accessCode || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold">Your Registered Email:</span>
                  <span className="text-sm font-medium text-gray-700 break-all">{formData.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => {
                // Clear local storage and return to home page
                localStorage.removeItem('maradex_loan_id');
                localStorage.removeItem('maradex_secret_token');
                router.push('/');
              }}
              className="w-full sm:w-auto"
            >
              Back to Homepage
            </Button>
          </div>
        ) : (
          /* Upload State UI */
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-blue mb-4 leading-tight">
              Verify <span className="text-accent-blue">your identity.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 font-medium max-w-2xl leading-relaxed">
              To complete your student loan submission, we require you to upload high-quality copies of your student ID and a state-issued photo ID.
            </p>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm font-medium mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Grid for two uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              
              {/* Box 1: Student ID */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 text-secondary-blue rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-primary-blue text-lg">Student ID</h3>
                    <p className="text-xs text-gray-500">School enrollment verification</p>
                  </div>
                </div>

                <input 
                  type="file" 
                  ref={studentInputRef} 
                  onChange={(e) => e.target.files && handleUploadFile(e.target.files[0], 'student')}
                  className="hidden" 
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                />

                {/* Upload Target Box */}
                {!studentIdUrl ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'student')}
                    onClick={() => studentInputRef.current?.click()}
                    className={`flex-grow border-2 border-dashed border-gray-300 hover:border-secondary-blue rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50/20 group min-h-[220px]`}
                  >
                    {uploadingStudent ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-secondary-blue animate-spin mb-4" />
                        <span className="text-sm font-bold text-gray-700">Uploading document...</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-12 h-12 text-gray-400 group-hover:text-secondary-blue transition-colors mb-4" />
                        <span className="text-sm font-bold text-primary-blue mb-1">Drag and drop file here</span>
                        <span className="text-xs text-gray-500 mb-3">or click to browse your files</span>
                        <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">PNG, JPG, PDF (Max 5MB)</span>
                      </>
                    )}
                  </div>
                ) : (
                  /* Preview Box */
                  <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-[220px] bg-slate-50 relative group">
                    {studentIdPreview && !studentIdUrl.endsWith('.pdf') ? (
                      <div className="relative flex-grow flex items-center justify-center bg-gray-900 overflow-hidden min-h-[160px]">
                        <img 
                          src={studentIdPreview} 
                          alt="Student ID Preview" 
                          className="max-h-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                        <FileText className="w-16 h-16 text-secondary-blue mb-3" />
                        <span className="text-sm font-bold text-gray-800 truncate max-w-[200px] block">
                          {studentIdUrl.split('/').pop()}
                        </span>
                        <span className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Uploaded successfully
                        </span>
                      </div>
                    )}
                    
                    {/* Delete Footer */}
                    <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">Student ID document</span>
                      <button 
                        onClick={() => handleDeleteFile('student')}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Box 2: State ID */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 text-secondary-blue rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-primary-blue text-lg">State-Issued ID</h3>
                    <p className="text-xs text-gray-500">Government identity verification</p>
                  </div>
                </div>

                <input 
                  type="file" 
                  ref={stateInputRef} 
                  onChange={(e) => e.target.files && handleUploadFile(e.target.files[0], 'state')}
                  className="hidden" 
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                />

                {/* Upload Target Box */}
                {!stateIdUrl ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'state')}
                    onClick={() => stateInputRef.current?.click()}
                    className={`flex-grow border-2 border-dashed border-gray-300 hover:border-secondary-blue rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50/20 group min-h-[220px]`}
                  >
                    {uploadingState ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-secondary-blue animate-spin mb-4" />
                        <span className="text-sm font-bold text-gray-700">Uploading document...</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-12 h-12 text-gray-400 group-hover:text-secondary-blue transition-colors mb-4" />
                        <span className="text-sm font-bold text-primary-blue mb-1">Drag and drop file here</span>
                        <span className="text-xs text-gray-500 mb-3">or click to browse your files</span>
                        <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">PNG, JPG, PDF (Max 5MB)</span>
                      </>
                    )}
                  </div>
                ) : (
                  /* Preview Box */
                  <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-[220px] bg-slate-50 relative group">
                    {stateIdPreview && !stateIdUrl.endsWith('.pdf') ? (
                      <div className="relative flex-grow flex items-center justify-center bg-gray-900 overflow-hidden min-h-[160px]">
                        <img 
                          src={stateIdPreview} 
                          alt="State ID Preview" 
                          className="max-h-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                        <FileText className="w-16 h-16 text-secondary-blue mb-3" />
                        <span className="text-sm font-bold text-gray-800 truncate max-w-[200px] block">
                          {stateIdUrl.split('/').pop()}
                        </span>
                        <span className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Uploaded successfully
                        </span>
                      </div>
                    )}
                    
                    {/* Delete Footer */}
                    <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">State-Issued ID document</span>
                      <button 
                        onClick={() => handleDeleteFile('state')}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                <FileUp className="w-4 h-4" />
                <span>Uploads are securely encrypted and private</span>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => router.push('/apply/submit')}
                  disabled={uploadingStudent || uploadingState || isSubmittingDocs}
                  className="w-full md:w-auto px-8 h-12 rounded-full border border-gray-300 bg-white text-primary-blue hover:bg-slate-50 transition-colors font-bold text-[14.5px]"
                >
                  Back to Disclosures
                </button>
                <Button 
                  onClick={handleSubmitAllDocuments}
                  disabled={!studentIdUrl || !stateIdUrl}
                  loading={isSubmittingDocs}
                  className="w-full md:w-[240px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Submit Application <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
