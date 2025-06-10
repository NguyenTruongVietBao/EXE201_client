import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authServices from '../services/authServices';
import envConfig from '../configs/envConfig';
import interestServices from '../services/interestServices';

const AUTH_STORE_KEY = envConfig.AUTH_STORE_KEY;
const ACCESS_TOKEN_KEY = envConfig.ACCESS_TOKEN_KEY;

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
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
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            const userInterests = await interestServices.getUserInterests();
            const { user, accessToken } = data;
            set({
              user,
              accessToken,
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
            accessToken: null,
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
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        set({
          user: null,
          accessToken: null,
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
        const { accessToken, user } = get();
        return !!(accessToken && user);
      },

      // Initialize auth state (gọi khi app khởi động)
      initializeAuth: () => {
        const { accessToken, user } = get();
        if (accessToken && user) {
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
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        userInterests: state.userInterests,
      }),
    }
  )
);

export default useAuthStore;
