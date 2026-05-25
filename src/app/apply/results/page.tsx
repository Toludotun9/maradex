'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, Loader2, ChevronRight, FileUp, CreditCard, Clock, XCircle } from 'lucide-react';
import Button from '@/components/Button';
import { useAppContext } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';

type GovIdType = 'drivers_license' | 'state_id';

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

  // Selected Government ID Type
  const [govIdType, setGovIdType] = useState<GovIdType>('drivers_license');

  // Document states
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  const [govFrontFile, setGovFrontFile] = useState<File | null>(null);
  const [govBackFile, setGovBackFile] = useState<File | null>(null);
  
  // Uploaded Storage paths
  const [studentIdUrl, setStudentIdUrl] = useState<string | null>(null);
  const [govFrontUrl, setGovFrontUrl] = useState<string | null>(null);
  const [govBackUrl, setGovBackUrl] = useState<string | null>(null);

  // Status and previews (signed URLs from storage)
  const [studentIdPreview, setStudentIdPreview] = useState<string | null>(null);
  const [govFrontPreview, setGovFrontPreview] = useState<string | null>(null);
  const [govBackPreview, setGovBackPreview] = useState<string | null>(null);
  
  const [uploadingStudent, setUploadingStudent] = useState(false);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);
  const [isSubmittingDocs, setIsSubmittingDocs] = useState(false);
  
  // App decision status loaded from database ('draft', 'submitted', 'pending', 'approved', 'rejected')
  const [appStatus, setAppStatus] = useState<string>('draft');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const studentInputRef = useRef<HTMLInputElement>(null);
  const govFrontInputRef = useRef<HTMLInputElement>(null);
  const govBackInputRef = useRef<HTMLInputElement>(null);

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
        .select('student_id_url, gov_id_type, gov_id_front_url, gov_id_back_url, status')
        .eq('id', loanId)
        .single();

      if (error) throw error;

      if (data) {
        setAppStatus(data.status || 'draft');

        if (data.gov_id_type) {
          setGovIdType(data.gov_id_type as GovIdType);
        }

        if (data.student_id_url) {
          setStudentIdUrl(data.student_id_url);
          const { data: signedData } = await supabase.storage
            .from('identity_documents')
            .createSignedUrl(data.student_id_url, 3600);
          if (signedData) setStudentIdPreview(signedData.signedUrl);
        }

        if (data.gov_id_front_url) {
          setGovFrontUrl(data.gov_id_front_url);
          const { data: signedData } = await supabase.storage
            .from('identity_documents')
            .createSignedUrl(data.gov_id_front_url, 3600);
          if (signedData) setGovFrontPreview(signedData.signedUrl);
        }

        if (data.gov_id_back_url) {
          setGovBackUrl(data.gov_id_back_url);
          const { data: signedData } = await supabase.storage
            .from('identity_documents')
            .createSignedUrl(data.gov_id_back_url, 3600);
          if (signedData) setGovBackPreview(signedData.signedUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching existing documents:', err);
    }
  };

  const handleUploadFile = async (file: File, type: 'student' | 'gov_front' | 'gov_back') => {
    if (!loanId) {
      setErrorMsg('Application session not initialized. Please go back and save.');
      return;
    }

    let setUploading;
    let setPreview;
    let setDocUrl;

    if (type === 'student') {
      setUploading = setUploadingStudent;
      setPreview = setStudentIdPreview;
      setDocUrl = setStudentIdUrl;
    } else if (type === 'gov_front') {
      setUploading = setUploadingFront;
      setPreview = setGovFrontPreview;
      setDocUrl = setGovFrontUrl;
    } else {
      setUploading = setUploadingBack;
      setPreview = setGovBackPreview;
      setDocUrl = setGovBackUrl;
    }

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
      setPreview(null);
    }

    const fileExt = file.name.split('.').pop();
    const storagePath = `loans/${loanId}/${type}_id_${Date.now()}.${fileExt}`;

    try {
      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('identity_documents')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 2. Save document URL in database
      const dbUpdateField: Record<string, any> = {};
      if (type === 'student') {
        dbUpdateField.student_id_url = storagePath;
      } else if (type === 'gov_front') {
        dbUpdateField.gov_id_front_url = storagePath;
        dbUpdateField.gov_id_type = govIdType;
      } else {
        dbUpdateField.gov_id_back_url = storagePath;
        dbUpdateField.gov_id_type = govIdType;
      }

      const { error: dbError } = await supabase
        .from('loans')
        .update(dbUpdateField)
        .eq('id', loanId);

      if (dbError) throw dbError;

      // Update state
      setDocUrl(storagePath);
      if (type === 'student') {
        setStudentIdFile(file);
      } else if (type === 'gov_front') {
        setGovFrontFile(file);
      } else {
        setGovBackFile(file);
      }

      // If it's a PDF, generate temporary signed URL to view
      if (file.type === 'application/pdf') {
        const { data: signedData } = await supabase.storage
          .from('identity_documents')
          .createSignedUrl(storagePath, 3600);
        if (signedData) setPreview(signedData.signedUrl);
      }

    } catch (err: any) {
      console.error(`Upload error for ${type}:`, err);
      setErrorMsg(err.message || `Failed to upload ID file. Please try again.`);
      setPreview(null);
      setDocUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (type: 'student' | 'gov_front' | 'gov_back') => {
    let docUrl = '';
    let setFile;
    let setPreview;
    let setDocUrl;

    if (type === 'student') {
      docUrl = studentIdUrl || '';
      setFile = setStudentIdFile;
      setPreview = setStudentIdPreview;
      setDocUrl = setStudentIdUrl;
    } else if (type === 'gov_front') {
      docUrl = govFrontUrl || '';
      setFile = setGovFrontFile;
      setPreview = setGovFrontPreview;
      setDocUrl = setGovFrontUrl;
    } else {
      docUrl = govBackUrl || '';
      setFile = setGovBackFile;
      setPreview = setGovBackPreview;
      setDocUrl = setGovBackUrl;
    }

    if (!docUrl) return;

    try {
      // 1. Delete from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('identity_documents')
        .remove([docUrl]);

      if (storageError) throw storageError;

      // 2. Set database field to null
      const dbUpdateField = 
        type === 'student' ? { student_id_url: null } :
        type === 'gov_front' ? { gov_id_front_url: null } : { gov_id_back_url: null };

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
      console.error(`Delete error for ${type}:`, err);
      setErrorMsg(err.message || 'Failed to delete file. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'student' | 'gov_front' | 'gov_back') => {
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

  // Switch ID type (driver's license / state ID) and save to DB
  const handleIdTypeChange = async (type: GovIdType) => {
    setGovIdType(type);
    if (loanId) {
      try {
        await supabase
          .from('loans')
          .update({ gov_id_type: type })
          .eq('id', loanId);
      } catch (err) {
        console.error('Failed to update ID type in DB:', err);
      }
    }
  };

  const handleSubmitAllDocuments = async () => {
    if (!studentIdUrl || !govFrontUrl || !govBackUrl) {
      setErrorMsg('Please upload all required documents (Student ID, ID Front, and ID Back) before submitting.');
      return;
    }

    setIsSubmittingDocs(true);
    setErrorMsg(null);

    try {
      const result = await saveApplication({ 
        status: 'pending',
        gov_id_type: govIdType 
      });
      if (result.success) {
        setAppStatus('pending');
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

  const formatCurrency = (val: string | number) => {
    if (!val) return '$0';
    const num = typeof val === 'string' ? parseInt(val.replace(/\D/g, '')) : val;
    return isNaN(num) ? '$0' : `$${num.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow py-20">
        <Loader2 className="w-12 h-12 animate-spin text-secondary-blue mb-4" />
        <p className="text-gray-600 font-medium">Loading your application details...</p>
      </div>
    );
  }

  // SCREEN 1: Pending Decision Review
  if (appStatus === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 md:px-20 w-full max-w-5xl mx-auto font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-8 border border-amber-100 shadow-sm animate-pulse">
            <Clock className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-blue mb-4 tracking-tight leading-tight">
            Documents <span className="text-accent-blue">Under Review</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-medium">
            Thank you for verifying your identity. We have received your student ID and government-issued photo ID. 
            Our admin review team is currently verifying them.
          </p>

          <div className="w-full bg-[#f0f4f8] rounded-xl p-6 mb-8 text-left border border-blue-50">
            <h4 className="font-bold text-primary-blue mb-3 text-[15px]">Next Steps:</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 font-medium">
              <li>Your application status is now <span className="text-secondary-blue font-bold">Pending Review</span>.</li>
              <li>Keep check of your inbox; we will email you if we need any further details.</li>
              <li>You can check back on this screen anytime using:</li>
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
              localStorage.removeItem('maradex_loan_id');
              localStorage.removeItem('maradex_secret_token');
              router.push('/');
            }}
            className="w-full sm:w-auto"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  // SCREEN 2: Approved Decision
  if (appStatus === 'approved') {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 md:px-20 w-full max-w-5xl mx-auto font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100 shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-blue mb-8 tracking-tight leading-snug">
            Your Student Loan Application Is Approved. You'll be Eligible for <span className="text-green-600 font-black">{formatCurrency(formData.loanAmountRequested)}</span> loan.
          </h1>
          
          <div className="text-[15px] text-gray-600 leading-relaxed font-medium text-left bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-4 mb-8">
            <p>
              Congratulations! Your student loan request has been approved. Your application has successfully passed our initial review. A final assessment will now be conducted based on your financial profile, credit history, and our internal lending policies.
            </p>
            <p>
              Please note that additional documents or paperwork may be required to complete the processing and disbursement of the loan. A loan officer will contact you shortly to provide further details, next steps, and any outstanding requirements.
            </p>
            <p>
              We appreciate the opportunity to support your educational pursuits.
            </p>
          </div>

          <Button 
            onClick={() => {
              localStorage.removeItem('maradex_loan_id');
              localStorage.removeItem('maradex_secret_token');
              router.push('/');
            }}
            className="w-full sm:w-auto"
          >
            Finish & Return Home
          </Button>
        </div>
      </div>
    );
  }

  // SCREEN 3: Rejected Decision
  if (appStatus === 'rejected') {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 md:px-20 w-full max-w-5xl mx-auto font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8 border border-red-100 shadow-sm">
            <XCircle className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-blue mb-4 tracking-tight leading-tight">
            Application <span className="text-red-500">Status Update</span>
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed font-medium text-left bg-slate-50 p-6 rounded-xl border border-slate-100">
            Thank you for applying with Sallie Mae. Unfortunately, after reviewing your application details, credit profile, and uploaded verification documents, we are unable to approve your student loan request at this time. A loan officer will follow up with you by email with more details regarding this decision.
          </p>

          <Button 
            onClick={() => {
              localStorage.removeItem('maradex_loan_id');
              localStorage.removeItem('maradex_secret_token');
              router.push('/');
            }}
            className="w-full sm:w-auto"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  // DEFAULT SCREEN: Upload ID Grid
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-6 md:px-20 w-full max-w-5xl mx-auto">
      <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-blue mb-4 leading-tight">
          Verify <span className="text-accent-blue">your identity.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 font-medium max-w-2xl leading-relaxed">
          To complete your student loan submission, we require you to upload high-quality copies of your student ID and both front and back sides of your government-issued ID.
        </p>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm font-medium mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Main grid containing Student ID card and Gov ID Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
          
          {/* Box 1: Student ID Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 flex flex-col min-h-[460px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 text-secondary-blue rounded-xl flex items-center justify-center flex-shrink-0">
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

            {!studentIdUrl ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'student')}
                onClick={() => studentInputRef.current?.click()}
                className="flex-grow border-2 border-dashed border-gray-300 hover:border-secondary-blue rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50/20 group min-h-[300px]"
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
              <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-[300px] bg-slate-50 relative group">
                {studentIdPreview && !studentIdUrl.endsWith('.pdf') ? (
                  <div className="relative flex-grow flex items-center justify-center bg-gray-900 overflow-hidden min-h-[220px]">
                    <img 
                      src={studentIdPreview} 
                      alt="Student ID Preview" 
                      className="max-h-[240px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                
                <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
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

          {/* Box 2: Government-Issued ID Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 flex flex-col min-h-[460px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-secondary-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-primary-blue text-lg">Government ID</h3>
                  <p className="text-xs text-gray-500 font-medium">Select type & upload front + back</p>
                </div>
              </div>

              {/* ID Selector Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/55">
                <button
                  onClick={() => handleIdTypeChange('drivers_license')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${govIdType === 'drivers_license' ? 'bg-white text-primary-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  License
                </button>
                <button
                  onClick={() => handleIdTypeChange('state_id')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${govIdType === 'state_id' ? 'bg-white text-primary-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  State ID
                </button>
              </div>
            </div>

            {/* Sub-grid: Front and Back ID Uploaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              
              {/* Front Side Uploader */}
              <div className="flex flex-col h-full">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Front Side</span>
                <input 
                  type="file" 
                  ref={govFrontInputRef} 
                  onChange={(e) => e.target.files && handleUploadFile(e.target.files[0], 'gov_front')}
                  className="hidden" 
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                />

                {!govFrontUrl ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'gov_front')}
                    onClick={() => govFrontInputRef.current?.click()}
                    className="flex-grow border-2 border-dashed border-gray-300 hover:border-secondary-blue rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50/20 group min-h-[180px]"
                  >
                    {uploadingFront ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-secondary-blue animate-spin mb-2" />
                        <span className="text-xs font-bold text-gray-700">Uploading Front...</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-secondary-blue transition-colors mb-2" />
                        <span className="text-xs font-bold text-primary-blue mb-1">Front Image</span>
                        <span className="text-[10px] text-gray-500">Drag or click here</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-[180px] bg-slate-50 relative group">
                    {govFrontPreview && !govFrontUrl.endsWith('.pdf') ? (
                      <div className="relative flex-grow flex items-center justify-center bg-gray-900 overflow-hidden min-h-[130px]">
                        <img 
                          src={govFrontPreview} 
                          alt="Front ID Preview" 
                          className="max-h-[130px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                        <FileText className="w-10 h-10 text-secondary-blue mb-2" />
                        <span className="text-xs font-bold text-gray-800 truncate max-w-[120px] block">
                          {govFrontUrl.split('/').pop()}
                        </span>
                      </div>
                    )}
                    <div className="p-2 bg-white border-t border-gray-100 flex justify-between items-center text-[11px]">
                      <span className="text-[10px] text-green-600 font-bold">Uploaded</span>
                      <button 
                        onClick={() => handleDeleteFile('gov_front')}
                        className="text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Back Side Uploader */}
              <div className="flex flex-col h-full">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Back Side</span>
                <input 
                  type="file" 
                  ref={govBackInputRef} 
                  onChange={(e) => e.target.files && handleUploadFile(e.target.files[0], 'gov_back')}
                  className="hidden" 
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                />

                {!govBackUrl ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'gov_back')}
                    onClick={() => govBackInputRef.current?.click()}
                    className="flex-grow border-2 border-dashed border-gray-300 hover:border-secondary-blue rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50/20 group min-h-[180px]"
                  >
                    {uploadingBack ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-secondary-blue animate-spin mb-2" />
                        <span className="text-xs font-bold text-gray-700">Uploading Back...</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-secondary-blue transition-colors mb-2" />
                        <span className="text-xs font-bold text-primary-blue mb-1">Back Image</span>
                        <span className="text-[10px] text-gray-500">Drag or click here</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden flex flex-col min-h-[180px] bg-slate-50 relative group">
                    {govBackPreview && !govBackUrl.endsWith('.pdf') ? (
                      <div className="relative flex-grow flex items-center justify-center bg-gray-900 overflow-hidden min-h-[130px]">
                        <img 
                          src={govBackPreview} 
                          alt="Back ID Preview" 
                          className="max-h-[130px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                        <FileText className="w-10 h-10 text-secondary-blue mb-2" />
                        <span className="text-xs font-bold text-gray-800 truncate max-w-[120px] block">
                          {govBackUrl.split('/').pop()}
                        </span>
                      </div>
                    )}
                    <div className="p-2 bg-white border-t border-gray-100 flex justify-between items-center text-[11px]">
                      <span className="text-[10px] text-green-600 font-bold">Uploaded</span>
                      <button 
                        onClick={() => handleDeleteFile('gov_back')}
                        className="text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
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
              disabled={uploadingStudent || uploadingFront || uploadingBack || isSubmittingDocs}
              className="w-full md:w-auto px-8 h-12 rounded-full border border-gray-300 bg-white text-primary-blue hover:bg-slate-50 transition-colors font-bold text-[14.5px]"
            >
              Back to Disclosures
            </button>
            <Button 
              onClick={handleSubmitAllDocuments}
              disabled={!studentIdUrl || !govFrontUrl || !govBackUrl}
              loading={isSubmittingDocs}
              className="w-full md:w-[240px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Submit Application <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
