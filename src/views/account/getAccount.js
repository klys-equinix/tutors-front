import {Api} from "../../api/Api";
import * as config from "react-global-configuration";

export const getAccount = async () => {
  try {
    const resp = await Api.get(`${config.get('apiUrl')}/user/current`);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
