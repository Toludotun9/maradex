-- Add school attendance column to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_attendance TEXT;
