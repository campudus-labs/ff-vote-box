import low from 'lowdb';
import underscoreDb from 'underscore-db';

low.mixin(underscoreDb);

let db = low('users.json');

class UserModel {
  static getAll() {
    return db('users');
  }

  static get(id) {
    return db('users').find({id : id});
  }

  static getByUsername(username) {
    return db('users').find({ username: username });
  }

  static create(username, password, email) {
    let user = {
      username : username,
      password : password,
      email : email
    };

    return db('users').insert(user);
  }

  static update(id, username, password, email) {
    let user = {
      username : username,
      password : password,
      email : email
    };

    return db('users')
      .chain()
      .find({id : id})
      .assign(user)
      .value();
  }
}

export default UserModel