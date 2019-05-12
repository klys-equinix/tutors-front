import {AuthRepository} from "../../data/AuthRepository";
import {Api} from "../../api/Api";
import * as config from "react-global-configuration";
import {CurrentUserRepository} from "../../data/CurrentUserRepository";

export const getCurrentUser = async () => {
  try {
    const currentUserResp = await Api.get(`${config.get('apiUrl')}/user/current`);
    let data = currentUserResp.data;
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
