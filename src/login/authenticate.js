import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const authenticate = async (username, password) => {
  try {
    const resp = await Api.obtainAccessToken(username, password);
    const token = resp.data.access_token;
    AuthRepository.saveToken(token);

    return token;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
