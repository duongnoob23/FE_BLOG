const API_BASE_URL = "http://localhost:8081/api";

// Helper function để lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function để tạo headers với Bearer token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// API để lấy danh sách bài viết
export const getPhotos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/photo`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

// API login (đã có)
export const loginUser = async (userName, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// API register (đã có)
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
