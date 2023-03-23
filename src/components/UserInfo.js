//import Popup from "./Popup.js";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {

    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      description: this._about.textContent,
    }
  }
  setUserInfo({ username, description }) {

    this._name.textContent = username;
    this._about.textContent = description;
  }
}
