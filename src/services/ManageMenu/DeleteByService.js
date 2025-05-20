import axios from 'axios';
import { HOST_API_SERVER } from 'services/config';
import { accessToken } from 'utils/cookies/CookiesUtils';

export const DeleteByService = async (role, users) => {
  try {
    const token = accessToken()
    const response = await axios.post(
      `${HOST_API_SERVER}/users-manage`,
      {
        role,
        users
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
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
    return {
      
      success: false,
      message: error.response
        ? error.response.data.message
        : error.message,
    };
  }
};
