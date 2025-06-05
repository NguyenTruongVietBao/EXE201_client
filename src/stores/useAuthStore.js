import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authServices from '../services/authServies';
import envConfig from '../configs/envConfig';

const AUTH_STORE_KEY = envConfig.AUTH_STORE_KEY;
const TOKEN_KEY = envConfig.TOKEN_KEY;

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      userInterests: [],

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),

      // Login action
      login: async (credentials) => {
        try {
          set({ isLoading: true });

          const response = await authServices.login(credentials);
          const { status, message, statusCode, data } = response;
          if (status === true) {
            const userInterests = await authServices.getUserInterests(
              data.user.email
            );
            const { user, token } = data;
            set({
              user,
              token: token,
              isAuthenticated: true,
              userInterests: userInterests.data,
            });
            return { status, message, statusCode, data };
          } else {
            return { status, message, statusCode, data };
          }
        } catch (error) {
          set({
            message: error.message || 'Đăng nhập thất bại',
            user: null,
            token: null,
            isAuthenticated: false,
          });

          return {
            success: false,
            error: error.message || 'Đăng nhập thất bại',
            statusCode: error.statusCode,
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // Register action
      register: async (userData) => {
        try {
          set({ isLoading: true });

          const response = await authServices.register({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: 'customer',
          });
          const { status, message, statusCode, data } = response;
          if (status === true) {
            return { status, message, statusCode, data };
          } else {
            return { status, message, statusCode, data };
          }
        } catch (error) {
          return {
            success: false,
            message: error.message || 'Đăng ký thất bại',
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // Verify email action
      verifyEmail: async (verificationData) => {
        try {
          set({ isLoading: true });
          const response = await authServices.verifyEmail(verificationData);
          return response;
        } catch (error) {
          return {
            success: error,
            error: error.message || 'Xác thực email thất bại',
            statusCode: error.statusCode,
          };
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout action
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Check if user is authenticated (helper)
      checkAuth: () => {
        const { token, user } = get();
        return !!(token && user);
      },

      // Initialize auth state (gọi khi app khởi động)
      initializeAuth: () => {
        const { token, user } = get();
        if (token && user) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: AUTH_STORE_KEY,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        userInterests: state.userInterests,
      }),
    }
  )
);

export default useAuthStore;
