import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, LOGOUT_URL} from '../constants/LoginConstants.js';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    return this.handleAuth(when(request({
      url : LOGIN_URL,
      method : 'POST',
      crossOrigin : true,
      type : 'json',
      data : {
        username, password
      }
    })));
  }

  logout() {
    when(request({
      url : LOGOUT_URL,
      method : 'GET',
      crossOrigin : true
    })).then(function () {
      LoginActions.logoutUser();
    });
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function ({ username, id }) {
        let user = {
          username,
          id
        };
        LoginActions.loginUser(user);
        return true;
      });
  }
}

export default new AuthService()