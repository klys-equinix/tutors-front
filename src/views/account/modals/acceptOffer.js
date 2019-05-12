import * as config from "react-global-configuration";
import {Api} from "../../../api/Api";


export const acceptOffer = async (offerId) => {
    try {
        const resp = await Api.post(`${config.get('apiUrl')}/offer/${offerId}/confirmation`);

        return resp;
    } catch (e) {
        console.log(e.response.data);
        throw e.response.data;
    }
};
