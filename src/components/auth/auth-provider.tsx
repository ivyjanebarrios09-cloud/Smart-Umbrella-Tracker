'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      const sessionCookie = Cookies.get('__session');

      if (user) {
        const token = await user.getIdToken();
        if (sessionCookie !== token) {
            Cookies.set('__session', token, { expires: 7 }); 
        }
      } else {
        if (sessionCookie) {
            Cookies.remove('__session');
        }
      }
    });

    return () => unsubscribe();
  }, []);
  
  if (loading) {
      return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
