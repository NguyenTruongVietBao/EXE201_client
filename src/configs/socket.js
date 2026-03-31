import { io } from 'socket.io-client';
import { getToken } from '../utils';
import envConfig from './envConfig';

class SocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    if (this.socket?.connected || this.isConnecting) {
      return this.socket;
    }

    const token = getToken();
    if (!token) {
      console.error('No auth token found');
      return null;
    }

    this.isConnecting = true;

    try {
      const url = new URL(envConfig.BACKEND_URL);
      // If the URL has a subpath (like /prilab-server), we need to include it in the socket.io path
      // e.g., if BACKEND_URL=http://.../prilab-server, path should be /prilab-server/socket.io/
      const socketPath =
        url.pathname === '/' || !url.pathname
          ? '/socket.io/'
          : `${url.pathname}/socket.io/`.replace(/\/+/g, '/');

      console.log('Connecting to socket:', {
        origin: url.origin,
        path: socketPath,
        fullUrl: envConfig.BACKEND_URL,
      });

      this.socket = io(url.origin, {
        path: socketPath,
        auth: { token },
        transports: ['websocket'],
        upgrade: true,
        timeout: 10000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
        this.isConnecting = false;
        this.reconnectAttempts = 0;
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        this.isConnecting = false;
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        console.error('Connection details:', {
          backendUrl: envConfig.BACKEND_URL,
          origin: new URL(envConfig.BACKEND_URL).origin,
          path:
            new URL(envConfig.BACKEND_URL).pathname === '/'
              ? '/socket.io/'
              : `${new URL(envConfig.BACKEND_URL).pathname}/socket.io/`.replace(/\/+/g, '/'),
        });
        this.isConnecting = false;
        this.reconnectAttempts++;

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('Max reconnection attempts reached');
          this.disconnect();
        }
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      return this.socket;
    } catch (error) {
      console.error('Failed to create socket connection:', error);
      this.isConnecting = false;
      return null;
    }
  }

  isConnected() {
    return this.socket?.connected || false;
  }

  disconnect() {
    if (this.socket) {
      this.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  emit(event, data) {
    if (this.socket?.connected) {
      try {
        this.socket.emit(event, data);
        return true;
      } catch (error) {
        console.error('Error emitting socket event:', error);
        return false;
      }
    } else {
      console.warn('Socket not connected, cannot emit:', event);
      return false;
    }
  }

  on(event, callback) {
    if (!this.socket) return;

    try {
      this.socket.on(event, callback);

      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(callback);
    } catch (error) {
      console.error('Error adding socket listener:', error);
    }
  }

  off(event, callback) {
    if (!this.socket) return;

    try {
      if (callback) {
        this.socket.off(event, callback);

        if (this.listeners.has(event)) {
          this.listeners.get(event).delete(callback);

          if (this.listeners.get(event).size === 0) {
            this.listeners.delete(event);
          }
        }
      } else {
        this.socket.off(event);
        this.listeners.delete(event);
      }
    } catch (error) {
      console.error('Error removing socket listener:', error);
    }
  }

  removeAllListeners(event) {
    if (!this.socket) return;

    try {
      if (event) {
        this.socket.removeAllListeners(event);
        this.listeners.delete(event);
      } else {
        this.socket.removeAllListeners();
        this.listeners.clear();
      }
    } catch (error) {
      console.error('Error removing all socket listeners:', error);
    }
  }

  getListenerCount() {
    let total = 0;
    for (const [event, listeners] of this.listeners) {
      total += listeners.size;
      console.log(`Event '${event}': ${listeners.size} listeners`);
    }
    return total;
  }
}

export const socketManager = new SocketManager();
export default socketManager;
