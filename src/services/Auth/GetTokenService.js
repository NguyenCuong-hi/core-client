import axios from 'axios';
import { HOST_API_SERVER } from 'services/config';

export const AuthLoginService = async (data) => {
  try {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('client_id', 'core_client');
    formData.append('client_secret', 'secret');
    formData.append('grant_type', 'password');

    const response = await axios.post(
      `${HOST_API_SERVER}/oauth/token`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('response', response)

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.response
    };
  }
};
