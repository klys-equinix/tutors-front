import {LocalStorage} from "./LocalStorage";

export class AuthRepository {
  static readToken() {
    return LocalStorage.read('accessToken');
  }

  static saveToken(accessToken) {
    LocalStorage.create('accessToken', accessToken);
  }

  static deleteToken() {
    LocalStorage.delete('accessToken');
  }
}
