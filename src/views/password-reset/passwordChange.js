import * as config from "react-global-configuration";
import {Api} from "../../api/Api";

export const passwordChange = async (password) => {
  try {
    const data = {
      password
    };
    const resp = await Api.patch(`${config.get('apiUrl')}/user/password`, data);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
