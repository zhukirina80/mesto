export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatar, _id }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatar = avatar;
    this._id = _id;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      avatar: this._avatar.src,
      id: this._id
    }
  }

  setUserInfo({ name, about, avatar, userId }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._avatar.src = avatar;
    this._id = userId;
  }
}

