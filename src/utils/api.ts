// utils/api.ts
import axios from "axios";

const API_BASE_URL = "https://api.10minuteschool.com/discovery-service/api/v1";

export const fetchProductData = async (lang: string = "en") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/ielts-course`, {
      params: { lang },
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
        Accept: "application/json",
      },
    });

    // The API wraps the actual data in response.data.data
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data");
  }
};
