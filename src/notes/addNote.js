import {AuthRepository} from "../data/AuthRepository";
import {Api} from "../api/Api";

export const addNote = async (note) => {
  try {
    const resp = await Api.post("https://localhost:8080/api/note", note);
    return resp;
  } catch (e) {
    console.log(e.response.data);
    throw e.response.data;
  }
};
