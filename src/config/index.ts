const config = {
  baseUrl: import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api/v1",
  expireIn: 10080,
  secretKey: "123123",
};

export default config;
