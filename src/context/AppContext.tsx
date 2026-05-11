"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  saveApplication: () => Promise<{ success: boolean; error?: any }>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicantType, setApplicantType] = useState<'student' | 'cosigner' | null>('student');
  const [loanId, setLoanId] = useState<string | null>(null);
  const [secretToken, setSecretToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    loanBarExamYear: ''
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
          loanBarExamYear: data.loan_bar_exam_year || ''
        });
      }
    } catch (error) {
      console.error('Error fetching application:', error);
      localStorage.removeItem('maradex_loan_id');
      localStorage.removeItem('maradex_secret_token');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const saveApplication = async () => {
    try {
      const payload = {
        email: formData.email,
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
        form_data: formData,
        status: 'draft'
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

      return { success: true };
    } catch (error) {
      console.error('Error saving application:', error);
      return { success: false, error };
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
      isLoading
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
