-- Add personal information columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS middle_initial TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS suffix TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS can_text BOOLEAN DEFAULT false;

-- Note: We are keeping the form_data JSONB column for flexibility, 
-- but these specific columns will make querying and reporting much easier.
