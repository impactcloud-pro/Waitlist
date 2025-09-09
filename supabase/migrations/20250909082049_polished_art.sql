/*
  # Create registration requests table

  1. New Tables
    - `registration_requests`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, required) - Full name of the registrant
      - `email` (text, required) - Email address
      - `phone` (text, required) - Phone number
      - `organization` (text, required) - Organization name
      - `country` (text, required) - Country
      - `created_at` (timestamptz, default now()) - Registration timestamp

  2. Security
    - Enable RLS on `registration_requests` table
    - Add policy for public inserts (allow anyone to register)
    - Add policy for authenticated users to read all data (for admin access)

  3. Indexes
    - Add index on email for faster lookups
    - Add index on created_at for sorting
*/

-- Create the registration_requests table
CREATE TABLE IF NOT EXISTS registration_requests (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;

-- Policy to allow public inserts (anyone can register)
CREATE POLICY "Allow public inserts"
  ON registration_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy to allow authenticated users to read all data (for admin access)
CREATE POLICY "Allow authenticated users to read all data"
  ON registration_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registration_requests_email 
  ON registration_requests(email);

CREATE INDEX IF NOT EXISTS idx_registration_requests_created_at 
  ON registration_requests(created_at DESC);

-- Add index for organization lookups
CREATE INDEX IF NOT EXISTS idx_registration_requests_organization 
  ON registration_requests(organization);