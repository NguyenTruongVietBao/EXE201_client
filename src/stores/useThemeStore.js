import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('my-app-theme') || 'light',
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('my-app-theme', theme);
  },
}));

export default useThemeStore;
