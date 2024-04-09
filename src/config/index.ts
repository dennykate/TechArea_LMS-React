const config = {
  baseUrl:
    import.meta.env.VITE_BASE_URL || "https://lmsapi.techarea.space/api/v1",
  expireIn: 10080,
  secretKey: "123123",
};

export default config;
