import {Api} from "../../api/Api";
import * as config from "react-global-configuration";
import {getCurrentUser} from "../login/getCurrentUser";


export const createOffer = async (pickedCourseId, offer) => {
    try {
        const offerDto = {
            courseId: pickedCourseId,
            day: offer.day,
            hour: `${offer.hour.getHours()}:${offer.hour.getMinutes()}`
        };
        const resp = await Api.post(`${config.get('apiUrl')}/offer`, offerDto);

        return resp;
    } catch (e) {
        console.log(e.response.data);
        throw e.response.data;
    }
};
