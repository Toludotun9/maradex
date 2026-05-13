-- Add loan_financial_aid column to track estimated financial aid subtractable from cost of attendance
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS loan_financial_aid TEXT;
