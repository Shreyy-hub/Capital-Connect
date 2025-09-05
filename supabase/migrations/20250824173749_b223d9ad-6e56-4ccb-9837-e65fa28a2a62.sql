-- Remove the overly permissive policy that allows any authenticated user to view email subscribers
DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON public.email_subscribers;

-- Create a more restrictive policy that only allows service role access
-- This means only the application itself (via server-side code) can read the subscribers
-- Regular users, even if authenticated, cannot access the email list
CREATE POLICY "Only service role can view subscribers" 
ON public.email_subscribers 
FOR SELECT 
USING (auth.role() = 'service_role'::text);
