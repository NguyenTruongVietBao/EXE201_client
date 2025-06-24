import envConfig from '../configs/envConfig';
import socketManager from '../configs/socket';

export const socketDebugger = {
  // Test kết nối socket
  testConnection() {
    console.log('=== SOCKET DEBUG INFO ===');

    const connectionInfo = socketManager.getConnectionInfo();
    console.log('Connection Info:', connectionInfo);

    if (!socketManager.isConnected()) {
      console.log('Socket not connected. Attempting to connect...');
      const socket = socketManager.connect();

      if (socket) {
        socket.on('connect', () => {
          console.log('✅ Socket connected successfully!');
          this.logConnectionDetails();
        });

        socket.on('connect_error', (error) => {
          console.error('❌ Connection failed:', error.message);
          this.suggestFixes(error);
        });
      }
    } else {
      console.log('✅ Socket already connected');
      this.logConnectionDetails();
    }
  },

  // Log chi tiết connection
  logConnectionDetails() {
    const info = socketManager.getConnectionInfo();
    console.log('📊 Connection Details:');
    console.log('- Socket ID:', info.id);
    console.log('- Namespace:', info.namespace);
    console.log('- Transport:', info.transport);
    console.log('- URL:', info.url);
    console.log('- Status:', info.status);
  },

  // Đề xuất cách khắc phục
  suggestFixes(error) {
    console.log('🔧 Suggested fixes:');

    if (error.message?.includes('Invalid namespace')) {
      console.log('❗ Invalid Namespace Error:');
      console.log('1. Kiểm tra server có hỗ trợ namespace "/" không');
      console.log(
        '2. Thử kết nối với namespace khác: socketManager.connectToNamespace("/chat")'
      );
      console.log(
        '3. Xác minh URL backend: ',
        socketManager.getConnectionInfo().url
      );
    }

    if (error.message?.includes('timeout')) {
      console.log('❗ Timeout Error:');
      console.log('1. Kiểm tra kết nối mạng');
      console.log('2. Xác minh server đang chạy');
      console.log('3. Thử tăng timeout trong config');
    }

    if (error.message?.includes('CORS')) {
      console.log('❗ CORS Error:');
      console.log('1. Kiểm tra server cho phép origin của frontend');
      console.log('2. Đảm bảo withCredentials được cấu hình đúng');
    }
  },

  // Test với namespace khác
  testNamespace(namespace = '/chat') {
    console.log(`Testing connection to namespace: ${namespace}`);
    socketManager.disconnect();
    socketManager.connectToNamespace(namespace);
  },

  // Reset connection
  resetConnection() {
    console.log('Resetting socket connection...');
    socketManager.disconnect();
    setTimeout(() => {
      socketManager.connect();
    }, 1000);
  },

  // Kiểm tra server status
  async checkServerStatus() {
    try {
      const backendUrl = envConfig.BACKEND_URL;
      console.log(`Checking server status at: ${backendUrl}`);

      const response = await fetch(`${backendUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('✅ Server is responding');
        return true;
      } else {
        console.log('❌ Server returned error:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Server check failed:', error.message);
      return false;
    }
  },
};

// Expose to window for easy debugging
if (typeof window !== 'undefined') {
  window.socketDebugger = socketDebugger;
  window.socketManager = socketManager;
}

export default socketDebugger;
