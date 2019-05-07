import {LocalStorage} from "./LocalStorage";

export class CurrentUserRepository {
  static readCurrentUser() {
    return LocalStorage.read('currentUser');
  }

  static saveCurrentUser(currentUser) {
    if(currentUser.details) {
      currentUser.details.lastName = currentUser.details.lastName.replace(/[^\x00-\x7F]/g, "");
    }
    LocalStorage.create('currentUser', currentUser);
  }

  static deleteCurrentUser() {
    LocalStorage.delete('currentUser');
  }
}
