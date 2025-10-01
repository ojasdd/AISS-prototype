import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 5000,
});

export const postAll = (payload) => api.post('/timetable', payload); // aggregated endpoint
export const postFaculty = (f) => api.post('/faculty', f);
export const postCourse = (c) => api.post('/course', c);
export const postClassroom = (r) => api.post('/classroom', r);

export default api;
