"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "@/store";
import { setAuthState } from "@/app/(auth)/authSlice";
import { createClient } from "@/lib/supabase/client";
import { resetAppState } from "@/app/appSlice";

function AuthHydrator() {
  useEffect(() => {
    const supabase = createClient();

    // Initial load
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        store.dispatch(setAuthState({ status: "signedOut", user: null }));
        return;
      }
      const user = data.user;
      store.dispatch(
        setAuthState({
          status: "signedIn",
          user: {
            id: user.id,
            email: user.email ?? null,
            phone: user.phone || null,
            displayName: user.user_metadata?.display_name ?? null,
          },
        })
      );
    });

    // Keep Redux in sync with auth events
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) {
        store.dispatch(setAuthState({ status: "signedOut", user: null }));
        store.dispatch(resetAppState());
        return;
      }

      store.dispatch(
        setAuthState({
          status: "signedIn",
          user: {
            id: user.id,
            email: user.email ?? null,
            phone: user.phone || null,
            displayName: user.user_metadata?.display_name ?? null,
          },
        })
      );
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}
