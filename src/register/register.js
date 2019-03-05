import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const register = async (username, password) => {
  try {
    const data = {
      email: username,
      password
    };
    const resp = await Api.postWithoutToken("https://localhost:8080/api/user", data);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
