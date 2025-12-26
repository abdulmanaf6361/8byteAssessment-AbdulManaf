import axios from "axios"
import { config } from "../config"

// const API_BASE_URL = "https://your-api.com" // replace with your backend base URL

// Create an axios instance
const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Generic GET
export const getRequest = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// ✅ Generic POST
export const postRequest = async (url, body = {}) => {
  try {
    const response = await api.post(url, body)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// ✅ Generic PUT
export const putRequest = async (url, body = {}) => {
  try {
    const response = await api.put(url, body)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// ✅ Generic DELETE
export const deleteRequest = async (url) => {
  try {
    const response = await api.delete(url)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

// Error handling
const handleError = (error) => {
  if (error.response) {
    // server responded with error code
    console.error("API Error:", error.response.data)
    throw new Error(error.response.data.message || "API request failed")
  } else if (error.request) {
    // no response from server
    console.error("No response from API:", error.request)
    throw new Error("No response from server")
  } else {
    console.error("Request setup error:", error.message)
    throw new Error("Request failed")
  }
}
