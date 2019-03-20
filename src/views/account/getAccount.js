import {Api} from "../../api/Api";

export const getAccount = async () => {
  try {
    const resp = await Api.get(`http://localhost:8080/api/user/current`);
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
