import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const passwordChange = async (password) => {
  try {
    const data = {
      password
    };
    const resp = await Api.patch("http://localhost:8080/api/user/password", data);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
