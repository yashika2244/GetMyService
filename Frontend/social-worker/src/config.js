// export const BASE_URL="http://localhost:5000"

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const token =localStorage.getItem("token") 