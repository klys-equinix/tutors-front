import {Api} from "../../api/Api";
import * as config from "react-global-configuration";

export const register = async (username, password) => {
  try {
    const data = {
      email: username,
      password
    };
    return await Api.postWithoutToken(`${config.get('apiUrl')}/user`, data);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
