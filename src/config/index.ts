export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api",
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA !== "false", // defaults to true unless explicitly "false"
};

export default CONFIG;
