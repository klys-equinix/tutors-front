import {Api} from "../../api/Api";
import * as config from "react-global-configuration";

export const getProfiles = async (lat, lng, range, level) => {
  try {
    const resp = await Api.get(`${config.get('apiUrl')}/user/tutor-profile?lat=${lat}&lng=${lng}&radius=${range}&level=${level}`);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
