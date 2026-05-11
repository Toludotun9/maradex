-- Add graduation and bar exam date columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_grad_month TEXT,
ADD COLUMN IF NOT EXISTS loan_grad_year TEXT,
ADD COLUMN IF NOT EXISTS loan_bar_exam_month TEXT,
ADD COLUMN IF NOT EXISTS loan_bar_exam_year TEXT;
