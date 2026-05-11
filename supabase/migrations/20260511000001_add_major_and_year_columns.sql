-- Add major and year of study columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_major TEXT,
ADD COLUMN IF NOT EXISTS loan_year_of_study TEXT;
