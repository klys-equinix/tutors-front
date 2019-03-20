import {Api} from "../../api/Api";

export const register = async (username, password) => {
  try {
    const data = {
      email: username,
      password
    };
    return await Api.postWithoutToken("http://localhost:8080/api/user", data);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
