import {Api} from "../../api/Api";
import * as config from "react-global-configuration";
import {getCurrentUser} from "../login/getCurrentUser";


export const updateLocation = async (coords) => {
    try {
        const resp = await Api.put(`${config.get('apiUrl')}/user/tutor-profile`, coords);

        return resp;
    } catch (e) {
        console.log(e.response.data);
        throw e.response.data;
    }
};
