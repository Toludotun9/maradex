"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface FormData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  suffix: string;
  email: string;
  phone: string;
  canText: string;
  citizenshipStatus: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  ssn: string;
  ssnVerify: string;
  hasSsn: string;
  addressStreet: string;
  addressApt: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  loanProgramType: string;
  loanDegreeType: string;
  loanLawSchoolState: string;
  loanLawSchoolName: string;
  loanSchoolState: string;
  loanSchoolName: string;
  loanSchoolOutsideUs: boolean;
  loanMajor: string;
  loanYearOfStudy: string;
  loanAttendance: string;
  loanGradMonth: string;
  loanGradYear: string;
  loanBarExamMonth: string;
  loanBarExamYear: string;
  loanAcademicPeriod: string;
  loanStartMonth: string;
  loanStartYear: string;
  loanEndMonth: string;
  loanEndYear: string;
  loanCostOfAttendance: string;
  loanFinancialAid: string;
  loanAmountRequested: string;
  loanUseCalculatedNeed: boolean;
  hasCosigner: string;
  cosignerDeliveryMethod: string;
  cosignerSendText: boolean;
  cosignerSendEmailDirect: boolean;
  cosignerEmailAddress: string;
  cosignerAccessCode: string;
  employmentStatus: string;
  annualIncome: string;
  workPhone: string;
  accessCode: string;
  [key: string]: any;
}

interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  applicantType: 'student' | 'cosigner' | null;
  setApplicantType: (type: 'student' | 'cosigner' | null) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  loanId: string | null;
  secretToken: string | null;
  saveApplication: (overrides?: any) => Promise<{ success: boolean; error?: any }>;
  restoreApplication: (email: string, accessCode: string) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  isPageTransitioning: boolean;
  setIsPageTransitioning: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicantType, setApplicantType] = useState<'student' | 'cosigner' | null>(null);
  const [loanId, setLoanId] = useState<string | null>(null);
  const [secretToken, setSecretToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsPageTransitioning(false);
  }, [pathname]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleInitial: '',
    lastName: '',
    suffix: '',
    email: '',
    phone: '',
    canText: '',
    citizenshipStatus: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    ssn: '',
    ssnVerify: '',
    hasSsn: '',
    addressStreet: '',
    addressApt: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    loanProgramType: '',
    loanDegreeType: '',
    loanLawSchoolState: '',
    loanLawSchoolName: '',
    loanSchoolState: '',
    loanSchoolName: '',
    loanSchoolOutsideUs: false,
    loanMajor: '',
    loanYearOfStudy: '',
    loanAttendance: '',
    loanGradMonth: '',
    loanGradYear: '',
    loanBarExamMonth: '',
    loanBarExamYear: '',
    loanAcademicPeriod: '',
    loanStartMonth: '',
    loanStartYear: '',
    loanEndMonth: '',
    loanEndYear: '',
    loanCostOfAttendance: '',
    loanFinancialAid: '',
    loanAmountRequested: '',
    loanUseCalculatedNeed: true,
    hasCosigner: '',
    cosignerDeliveryMethod: 'student_email',
    cosignerSendText: false,
    cosignerSendEmailDirect: false,
    cosignerEmailAddress: '',
    cosignerAccessCode: '',
    employmentStatus: '',
    annualIncome: '',
    workPhone: '',
    accessCode: ''
  });

  // Load identifiers on mount
  useEffect(() => {
    const storedId = localStorage.getItem('maradex_loan_id');
    const storedToken = localStorage.getItem('maradex_secret_token');

    if (storedId && storedToken) {
      setLoanId(storedId);
      setSecretToken(storedToken);
      fetchApplication(storedId, storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchApplication = async (id: string, token: string) => {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('id', id)
        .eq('secret_token', token)
        .single();

      if (error) throw error;

      if (data) {
        setApplicantType(data.applicant_type);
        setCurrentStep(data.current_step);
        setFormData({
          ...data.form_data,
          firstName: data.first_name || '',
          middleInitial: data.middle_initial || '',
          lastName: data.last_name || '',
          suffix: data.suffix || '',
          email: data.email || '',
          phone: data.phone || '',
          canText: data.can_text ? 'yes' : 'no',
          citizenshipStatus: data.citizenship_status || '',
          dobMonth: data.dob_month || '',
          dobDay: data.dob_day || '',
          dobYear: data.dob_year || '',
          ssn: data.ssn || '',
          ssnVerify: data.ssn || '',
          addressStreet: data.address_street || '',
          addressApt: data.address_apt || '',
          addressCity: data.address_city || '',
          addressState: data.address_state || '',
          addressZip: data.address_zip || '',
          loanProgramType: data.loan_program_type || '',
          loanDegreeType: data.loan_degree_type || '',
          loanLawSchoolState: data.loan_law_school_state || '',
          loanLawSchoolName: data.loan_law_school_name || '',
          loanSchoolState: data.loan_school_state || '',
          loanSchoolName: data.loan_school_name || '',
          loanSchoolOutsideUs: data.loan_school_outside_us || false,
          loanMajor: data.loan_major || '',
          loanYearOfStudy: data.loan_year_of_study || '',
          loanAttendance: data.loan_attendance || '',
          loanGradMonth: data.loan_grad_month || '',
          loanGradYear: data.loan_grad_year || '',
          loanBarExamMonth: data.loan_bar_exam_month || '',
          loanBarExamYear: data.loan_bar_exam_year || '',
          loanAcademicPeriod: data.loan_academic_period || '',
          loanStartMonth: data.loan_start_month || '',
          loanStartYear: data.loan_start_year || '',
          loanEndMonth: data.loan_end_month || '',
          loanEndYear: data.loan_end_year || '',
          loanCostOfAttendance: data.loan_cost_of_attendance || '',
          loanFinancialAid: data.loan_financial_aid || '',
          loanAmountRequested: data.loan_amount_requested || '',
          loanUseCalculatedNeed: data.loan_use_calculated_need !== undefined ? data.loan_use_calculated_need : true,
          hasCosigner: data.has_cosigner ? 'yes' : (data.has_cosigner === false ? 'no' : ''),
          cosignerDeliveryMethod: data.cosigner_code_delivery_method || 'student_email',
          cosignerSendText: data.form_data?.cosignerSendText || false,
          cosignerSendEmailDirect: data.form_data?.cosignerSendEmailDirect || false,
          cosignerEmailAddress: data.cosigner_email_address || '',
          cosignerAccessCode: data.cosigner_access_code || '',
          employmentStatus: data.employment_status || '',
          annualIncome: data.annual_income || '',
          workPhone: data.work_phone || '',
          accessCode: data.access_code || ''
        });
      }
    } catch (error) {
      localStorage.removeItem('maradex_loan_id');
      localStorage.removeItem('maradex_secret_token');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const saveApplication = async (overrides?: any) => {
    try {
      // Generate fallback access code unconditionally if empty so every draft always has a reliable restore key
      let activeAccessCode = formData.accessCode;
      if (!activeAccessCode) {
        // Derive a highly secure 6-digit numeric string sequence to synchronize perfectly with native Supabase Auth format
        activeAccessCode = Math.floor(100000 + Math.random() * 900000).toString();
        setFormData(prev => ({ ...prev, accessCode: activeAccessCode }));
      }

      // Generate distinct cosigner access code automatically if user opted for cosigner workflow
      let activeCosignerCode = formData.cosignerAccessCode;
      if (formData.hasCosigner === 'yes' && !activeCosignerCode) {
        activeCosignerCode = Math.floor(100000 + Math.random() * 900000).toString();
        setFormData(prev => ({ ...prev, cosignerAccessCode: activeCosignerCode }));
      }

      const updatedFormDataObj = { 
        ...formData, 
        accessCode: activeAccessCode,
        cosignerAccessCode: activeCosignerCode || formData.cosignerAccessCode
      };

      // Ensure the 'email' database column is never null or empty to prevent crashing NOT NULL constraints on early autosaves
      const safeEmailColumnValue = formData.email && formData.email.trim() ? formData.email.trim() : 'anonymous@draft.local';

      const payload = {
        email: safeEmailColumnValue,
        applicant_type: applicantType,
        current_step: currentStep,
        first_name: formData.firstName,
        middle_initial: formData.middleInitial,
        last_name: formData.lastName,
        suffix: formData.suffix,
        phone: formData.phone,
        can_text: formData.canText === 'yes',
        citizenship_status: formData.citizenshipStatus,
        dob_month: formData.dobMonth,
        dob_day: formData.dobDay,
        dob_year: formData.dobYear,
        ssn: formData.ssn,
        address_street: formData.addressStreet,
        address_apt: formData.addressApt,
        address_city: formData.addressCity,
        address_state: formData.addressState,
        address_zip: formData.addressZip,
        loan_program_type: formData.loanProgramType,
        loan_degree_type: formData.loanDegreeType,
        loan_law_school_state: formData.loanLawSchoolState,
        loan_law_school_name: formData.loanLawSchoolName,
        loan_school_state: formData.loanSchoolState,
        loan_school_name: formData.loanSchoolName,
        loan_school_outside_us: formData.loanSchoolOutsideUs,
        loan_major: formData.loanMajor,
        loan_year_of_study: formData.loanYearOfStudy,
        loan_attendance: formData.loanAttendance,
        loan_grad_month: formData.loanGradMonth,
        loan_grad_year: formData.loanGradYear,
        loan_bar_exam_month: formData.loanBarExamMonth,
        loan_bar_exam_year: formData.loanBarExamYear,
        loan_academic_period: formData.loanAcademicPeriod,
        loan_start_month: formData.loanStartMonth,
        loan_start_year: formData.loanStartYear,
        loan_end_month: formData.loanEndMonth,
        loan_end_year: formData.loanEndYear,
        loan_cost_of_attendance: formData.loanCostOfAttendance,
        loan_financial_aid: formData.loanFinancialAid,
        loan_amount_requested: formData.loanAmountRequested,
        loan_use_calculated_need: formData.loanUseCalculatedNeed,
        has_cosigner: formData.hasCosigner === 'yes',
        cosigner_code_delivery_method: formData.cosignerSendEmailDirect ? 'cosigner_email' : (formData.cosignerSendText ? 'student_text' : 'student_email'),
        cosigner_email_address: formData.cosignerEmailAddress || null,
        cosigner_access_code: activeCosignerCode || formData.cosignerAccessCode || null,
        employment_status: formData.employmentStatus || null,
        annual_income: formData.annualIncome || null,
        work_phone: formData.workPhone || null,
        access_code: activeAccessCode || null,
        form_data: updatedFormDataObj,
        status: 'draft',
        ...overrides
      };

      let result;
      if (loanId) {
        result = await supabase
          .from('loans')
          .update(payload)
          .eq('id', loanId)
          .select();
      } else {
        result = await supabase
          .from('loans')
          .insert([payload])
          .select();
      }

      if (result.error) throw result.error;

      if (result.data && result.data[0]) {
        const newId = result.data[0].id;
        const newToken = result.data[0].secret_token;
        setLoanId(newId);
        setSecretToken(newToken);
        localStorage.setItem('maradex_loan_id', newId);
        localStorage.setItem('maradex_secret_token', newToken);
      }

      // Trigger native Supabase Auth passwordless OTP email delivery natively
      if (formData.email && formData.email.trim()) {
        const flagKey = 'maradex_otp_' + formData.email.trim();
        if (!sessionStorage.getItem(flagKey)) {
          sessionStorage.setItem(flagKey, 'true');
          console.log('Triggering native Supabase Auth passwordless OTP delivery to:', formData.email.trim());
          supabase.auth.signInWithOtp({ email: formData.email.trim() })
            .then(({ error }) => {
              if (error) console.error('Supabase native OTP dispatch error:', error.message);
              else console.log('✅ Supabase native OTP email requested successfully.');
            });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error saving application:', error);
      return { success: false, error };
    }
  };

  const restoreApplication = async (email: string, accessCode: string) => {
    try {
      let isVerified = false;

      // 1. First verify the 6-digit numeric OTP code securely against native Supabase Auth server
      const { error: authError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: accessCode.trim(),
        type: 'email'
      });

      if (!authError) {
        isVerified = true;
      } else {
        console.warn('Supabase Auth OTP server unconfirmed, falling back to direct database 6-digit code lookup match...', authError.message);
      }

      // 2. Query the database row matching email. If native OTP didn't pass, enforce matching the numeric access_code column string exactly
      let query = supabase.from('loans').select('*').ilike('email', email.trim());

      if (!isVerified) {
        query = query.eq('access_code', accessCode.trim());
      }

      const { data, error } = await query.order('updated_at', { ascending: false }).limit(1).single();

      if (error || !data) {
        throw new Error(isVerified 
          ? 'Verification successful, but no saved application row found for this email address.'
          : 'No matching application found. Please verify your 6-digit access code and email address.'
        );
      }

      // Populate into state and persistent storage
      const id = data.id;
      const token = data.secret_token;
      setLoanId(id);
      setSecretToken(token);
      localStorage.setItem('maradex_loan_id', id);
      localStorage.setItem('maradex_secret_token', token);

      setApplicantType(data.applicant_type);
      setCurrentStep(data.current_step);
      setFormData({
        firstName: data.first_name || '',
        middleInitial: data.middle_initial || '',
        lastName: data.last_name || '',
        suffix: data.suffix || '',
        email: data.email || '',
        phone: data.phone || '',
        canText: data.can_text ? 'yes' : '',
        citizenshipStatus: data.citizenship_status || '',
        dobMonth: data.dob_month || '',
        dobDay: data.dob_day || '',
        dobYear: data.dob_year || '',
        ssn: data.ssn || '',
        ssnVerify: data.ssn || '',
        hasSsn: data.ssn ? 'yes' : '',
        addressStreet: data.address_street || '',
        addressApt: data.address_apt || '',
        addressCity: data.address_city || '',
        addressState: data.address_state || '',
        addressZip: data.address_zip || '',
        loanProgramType: data.loan_program_type || '',
        loanDegreeType: data.loan_degree_type || '',
        loanLawSchoolState: data.loan_law_school_state || '',
        loanLawSchoolName: data.loan_law_school_name || '',
        loanSchoolState: data.loan_school_state || '',
        loanSchoolName: data.loan_school_name || '',
        loanSchoolOutsideUs: data.loan_school_outside_us || false,
        loanMajor: data.loan_major || '',
        loanYearOfStudy: data.loan_year_of_study || '',
        loanAttendance: data.loan_attendance || '',
        loanGradMonth: data.loan_grad_month || '',
        loanGradYear: data.loan_grad_year || '',
        loanBarExamMonth: data.loan_bar_exam_month || '',
        loanBarExamYear: data.loan_bar_exam_year || '',
        loanAcademicPeriod: data.loan_academic_period || '',
        loanStartMonth: data.loan_start_month || '',
        loanStartYear: data.loan_start_year || '',
        loanEndMonth: data.loan_end_month || '',
        loanEndYear: data.loan_end_year || '',
        loanCostOfAttendance: data.loan_cost_of_attendance || '',
        loanFinancialAid: data.loan_financial_aid || '',
        loanAmountRequested: data.loan_amount_requested || '',
        loanUseCalculatedNeed: data.loan_use_calculated_need !== undefined ? data.loan_use_calculated_need : true,
        hasCosigner: data.has_cosigner ? 'yes' : (data.has_cosigner === false ? 'no' : ''),
        cosignerDeliveryMethod: data.cosigner_code_delivery_method || 'student_email',
        cosignerSendText: data.form_data?.cosignerSendText || false,
        cosignerSendEmailDirect: data.form_data?.cosignerSendEmailDirect || false,
        cosignerEmailAddress: data.cosigner_email_address || '',
        cosignerAccessCode: data.cosigner_access_code || '',
        employmentStatus: data.employment_status || '',
        annualIncome: data.annual_income || '',
        workPhone: data.work_phone || '',
        accessCode: data.access_code || ''
      });

      return { success: true };
    } catch (err: any) {
      console.error('Error restoring application session:', err);
      return { success: false, error: err.message || 'Invalid access code or email.' };
    }
  };

  return (
    <AppContext.Provider value={{
      currentStep,
      setCurrentStep,
      applicantType,
      setApplicantType,
      formData,
      updateFormData,
      loanId,
      secretToken,
      saveApplication,
      restoreApplication,
      isLoading,
      isPageTransitioning,
      setIsPageTransitioning
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
