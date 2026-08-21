import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USER } from '../data/mockData';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  register: (name: string, email: string, role?: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  toggleFavoriteProperty: (id: string) => void;
  toggleFavoriteFood: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(INITIAL_USER);
  const [role, setRoleState] = useState<UserRole>('GUEST');

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
    toast.success(`Switched role to ${newRole}! Welcome to your ${newRole.toLowerCase()} portal.`);
  };

  const login = (email: string, customRole: UserRole = 'GUEST') => {
    const newUser: User = {
      ...INITIAL_USER,
      email,
      role: customRole,
    };
    setUser(newUser);
    setRoleState(customRole);
    toast.success(`Welcome back, ${newUser.name}!`);
  };

  const register = (name: string, email: string, customRole: UserRole = 'GUEST') => {
    const newUser: User = {
      ...INITIAL_USER,
      name,
      email,
      role: customRole,
    };
    setUser(newUser);
    setRoleState(customRole);
    toast.success(`Account created! Welcome, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully.');
  };

  const toggleFavoriteProperty = (id: string) => {
    if (!user) {
      toast.error('Please login to save properties');
      return;
    }
    const current = user.savedProperties || [];
    const updated = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    setUser({ ...user, savedProperties: updated });
    toast(current.includes(id) ? 'Removed from saved properties' : '❤️ Added to saved properties!');
  };

  const toggleFavoriteFood = (id: string) => {
    if (!user) {
      toast.error('Please login to save foods');
      return;
    }
    const current = user.savedFoods || [];
    const updated = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    setUser({ ...user, savedFoods: updated });
    toast(current.includes(id) ? 'Removed from favorites' : '🍔 Added to favorites!');
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      setRole,
      toggleFavoriteProperty,
      toggleFavoriteFood,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
