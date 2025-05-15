import axios from "axios";
import { HOST_API_SERVER } from "services/config";
import { accessToken } from "utils/cookies/CookiesUtils";

export const SearchBy = async (search) => {
  try {
    const token = accessToken();

    const response = await axios.get(
      `${HOST_API_SERVER}/page`,
      search,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "ERROR_DATA",
      };
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : error.message,
    };
  }
};
