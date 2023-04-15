import { camelizeKeys } from 'humps';

const { VITE_SUPABASE_URL, VITE_SUPABASE_TOKEN } = import.meta.env;

const query = async <T>(endpoint: string) => {
  try {
    const url = new URL(`${VITE_SUPABASE_URL}/rest/v1/${endpoint}`);
    url.searchParams.append('apikey', VITE_SUPABASE_TOKEN);
    const response = await fetch(url);
    const data = await response.json();
    return camelizeKeys(data) as T;
  } catch {
    throw new Error('ERROR_SUPABASE_LOAD');
  }
};
