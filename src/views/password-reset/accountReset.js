import {Api} from "../../api/Api";
import * as config from "react-global-configuration";


export const accountReset = async (email, password, resetToken) => {
  try {
    const data = {
      email,
      password,
      resetToken
    };
    const resp = await Api.postWithoutToken(`${config.get('apiUrl')}/user/account/reset`, data);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
