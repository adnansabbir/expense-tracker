import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/login";
}

export async function supabaseForgotPassword(email: string) {
  const supabase = createClient();
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function supabaseUpdateUserData(payload: {
  data: {
    display_name?: string | undefined;
    phone?: string | undefined;
  };
}) {
  const supabase = createClient();
  return await supabase.auth.updateUser(payload);
}
