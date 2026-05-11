-- Add loan_program_type column to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_program_type TEXT;
