import {Api} from "../../api/Api";
import * as config from "react-global-configuration";

export const requestReset = async (email) => {
  try {
    const resp = await Api.getWithoutToken(`${config.get('apiUrl')}/user/account/reset?email=${email}`);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
