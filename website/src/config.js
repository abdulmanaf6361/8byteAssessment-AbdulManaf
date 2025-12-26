// Configuration for development and production environments

const isDevelopment = false;

export const config = {
  // API Base URLs
  API_BASE_URL: isDevelopment
    ? "http://127.0.0.1:8000/api"
    : "https://www.scifyx.com/api",

  // Environment
  // ENVIRONMENT: isDevelopment ? "development" : "production",

  // API Endpoints
  ENDPOINTS: {
    PRODUCTS: "/products/list",
    PEOPLE: "/people/list",
    CAREERS: "/careers/list",
    CONTACT: "/contacts/create/",
    APPLY_JOB: "/careers/apply/",
    JOB_DETAIL: (id) => `/careers/${id}/`,

  },

  // App Settings
  APP_NAME: "Scifyx Tech Private Limited",
  APP_DESCRIPTION: "Leading technology solutions provider",

  // Contact Information
  CONTACT: {
    EMAIL: "info@scifyx.com",
    PHONE: "+1-234-567-8900",
    ADDRESS: "Your Company Address",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper function to check if in development
// export const isDev = () => {
//   return config.ENVIRONMENT === "development";
// };
