-- Add columns to capture government-issued ID type, front image, and back image
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS gov_id_type TEXT,
ADD COLUMN IF NOT EXISTS gov_id_front_url TEXT,
ADD COLUMN IF NOT EXISTS gov_id_back_url TEXT;
