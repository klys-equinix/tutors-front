import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const accountReset = async (email, password, resetToken) => {
  try {
    const data = {
      email,
      password,
      resetToken
    };
    const resp = await Api.postWithoutToken("http://localhost:8080/api/user/account/reset", data);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
