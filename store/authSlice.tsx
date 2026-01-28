import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./services/authAPI";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: string;
    email: string;
  } | null;
}

// Load localStorage first
const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch (error) {
        console.error('Failed to parse auth from localStorage:', error);
      }
    }
  }
  return {
    isAuthenticated: false,
    token: null,
    user: null,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: { id: string; email: string } }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      
      // LocalStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user
        }));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        
        // LocalStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth', JSON.stringify({
            isAuthenticated: true,
            token: action.payload.token,
            user: action.payload.user
          }));
        }
      }
    );
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;