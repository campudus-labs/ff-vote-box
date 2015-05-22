import request from 'reqwest';
import when from 'when';
import {LOGIN_URL} from '../constants/LoginConstants.js';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    /*return this.handleAuth(when(request({
     url : LOGIN_URL,
     method : 'POST',
     crossOrigin : true,
     type : 'json',
     data : {
     username, password
     }
     })));*/
    return this.handleAuth(when({
      user : {
        sessionId: "dfga456e5uehsdfgq35zhwrg",
        username : "max"
      }
    }));
  }

  logout() {
    LoginActions.logoutUser();
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function (response) {
        let user = response.user;
        LoginActions.loginUser(user);
        return true;
      });
  }
}

export default new AuthService()