import { HOST_API_SERVER } from "services/config";
import { accessToken } from "utils/cookies/CookiesUtils";

export const GetUserService = async () => {
  try {
    const token = accessToken();

    const response = await axios.get(`${HOST_API_SERVER}/users/current`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message ,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response
    };
  }
};
