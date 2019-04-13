import {LocalStorage} from "./LocalStorage";

export class CurrentUserRepository {
  static readCurrentUser() {
    return LocalStorage.read('currentUser');
  }

  static saveCurrentUser(currentUser) {
    LocalStorage.create('currentUser', currentUser);
  }

  static deleteCurrentUser() {
    LocalStorage.delete('currentUser');
  }
}
