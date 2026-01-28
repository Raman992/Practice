"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { loginSuccess } from "@/store/authSlice";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        try {
          const authData = JSON.parse(savedAuth);
          if (authData.isAuthenticated && authData.token && authData.user) {
            dispatch(loginSuccess({
              token: authData.token,
              user: authData.user
            }));
          }
        } catch (error) {
          console.error('Failed to parse auth from localStorage:', error);
          localStorage.removeItem('auth');
        }
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}