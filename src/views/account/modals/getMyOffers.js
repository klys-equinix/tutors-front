import * as config from "react-global-configuration";
import {Api} from "../../../api/Api";

export const getMyOffers = async () => {
  try {
    const resp = await Api.get(`${config.get('apiUrl')}/offer`);
    let data = resp.data;
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
