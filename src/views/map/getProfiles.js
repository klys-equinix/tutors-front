import {Api} from "../../api/Api";
import * as config from "react-global-configuration";
import {getKeyByValue} from "../../utils/valFinder";
import Levels from "../../dict/Levels";
import Discipline from "../../dict/Discipline";

export const getProfiles = async (lat, lng, searchParams) => {
  try {
    const url = `${config.get('apiUrl')}/user/tutor-profile?lat=${lat}&lng=${lng}`;
    const resp = await Api.get(buildUrl(url, searchParams));
    return resp;
  } catch (e) {
    throw e;
  }
};

const buildUrl = (baseUrl, searchParams) => {
  for (let key in searchParams) {
      let val = searchParams[key]
      if(key === 'level')
        val = getKeyByValue(Levels, val)
      if(key === 'discipline')
        val = getKeyByValue(Discipline, val)
      if(key === 'radius' && val === null)
        val = 1;
      if(val && val !== '')
        baseUrl += `&${key}=${val}`
  }
  return baseUrl;
}