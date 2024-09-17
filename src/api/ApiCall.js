import axios from 'axios';
const Instance = axios.create({
  baseURL: 'https://astrology-3bjo.onrender.com/',
});
export const LocalInstance = axios.create({
  baseURL: 'http://localhost:4500/',
});
export default Instance;
