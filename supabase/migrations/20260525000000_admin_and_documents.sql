-- 1. Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Add columns to the loans table for ID uploads
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS student_id_url TEXT,
ADD COLUMN IF NOT EXISTS state_id_url TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- 3. Create the admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the admin_sessions table for stateless session token tracking
CREATE TABLE IF NOT EXISTS admin_sessions (
    token UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '1 day') NOT NULL
);

-- 5. Seed the admin user (username: admin, password: admin123)
INSERT INTO admins (username, password_hash)
VALUES ('admin', crypt('admin123', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;

-- 6. Helper RPC function to securely verify admin credentials on database side
CREATE OR REPLACE FUNCTION verify_admin(input_username TEXT, input_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    is_valid BOOLEAN;
BEGIN
    SELECT (password_hash = crypt(input_password, password_hash)) INTO is_valid
    FROM admins
    WHERE username = input_username;
    RETURN COALESCE(is_valid, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Initialize the storage bucket for identity documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'identity_documents', 
    'identity_documents', 
    false, -- Keep bucket private for user privacy and security
    5242880, -- 5MB limit
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 8. Add RLS Policies for Storage Bucket Objects
CREATE POLICY "Allow public upload to identity_documents" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'identity_documents');

CREATE POLICY "Allow public select from identity_documents" ON storage.objects
    FOR SELECT USING (bucket_id = 'identity_documents');

CREATE POLICY "Allow public delete from identity_documents" ON storage.objects
    FOR DELETE USING (bucket_id = 'identity_documents');
