import {Api} from "../../../api/Api";
import * as config from "react-global-configuration";


export const addProfile = async (data) => {
  try {
    const resp = await Api.post(`${config.get('apiUrl')}/user/tutor-profile`, data);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
