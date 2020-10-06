import axios from 'axios';

/**
 * The basic configuration to connect frontend with backend.
 * - 10.0.2.2 is the android emulator IP.
 * - 3333 is the port which backend server listens.
 */
const api = axios.create({
    baseURL: "http://10.0.2.2:3333",
    timeout: 5000
});

export default api;
