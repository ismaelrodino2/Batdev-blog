import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

const createClient = () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  export default createClient
