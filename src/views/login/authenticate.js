import {AuthRepository} from "../../data/AuthRepository";
import {Api} from "../../api/Api";
import * as config from "react-global-configuration";
import {CurrentUserRepository} from "../../data/CurrentUserRepository";
import {getCurrentUser} from "./getCurrentUser";

export const authenticate = async (username, password) => {
  try {
    const resp = await Api.obtainAccessToken(username, password);
    const token = resp.data.access_token;
    AuthRepository.saveToken(token);

    getCurrentUser();

    return token;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
