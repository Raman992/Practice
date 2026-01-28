export const saveAuthToLocalStorage = (authData: {
  token: string;
  user: { id: string; email: string };
}) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: true,
      token: authData.token,
      user: authData.user
    }));
  }
};

export const getAuthFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch (error) {
        return null;
      }
    }
  }
  return null;
};

export const clearAuthFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth');
  }
};