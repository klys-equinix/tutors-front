import {AuthRepository} from "../../data/AuthRepository";
import {Api} from "../../api/Api";

export const getUsers = async () => {
  try {
    const resp = await Api.get("http://localhost:8080/api/user");
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
