import {Api} from "../api/Api";

export const requestReset = async (email) => {
  try {
    const resp = await Api.getWithoutToken(`https://localhost:8080/api/user/account/reset?email=${email}`);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
