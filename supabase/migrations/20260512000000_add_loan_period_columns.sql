-- Add academic loan period columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_academic_period TEXT,
ADD COLUMN IF NOT EXISTS loan_start_month TEXT,
ADD COLUMN IF NOT EXISTS loan_start_year TEXT,
ADD COLUMN IF NOT EXISTS loan_end_month TEXT,
ADD COLUMN IF NOT EXISTS loan_end_year TEXT;
