import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const validatePassword = (password) => {
  var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");
  return re.test(password) && password.length > 7;
};
