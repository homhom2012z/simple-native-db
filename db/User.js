const fs = require("fs");

module.exports = class User {
  constructor(userData) {
    this.id = null;
    this.username = userData.username;
    this.email = userData.email;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.db_path = __dirname + "/storage/_db1.json";
  }
  _save() {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r+",
      })
    );
    const dbLength = readDB._data.users.length;

    if (dbLength === 0) {
      this.id = (1).toString();
    } else {
      const latestUserID = Number(readDB._data.users[dbLength - 1].id);
      this.id = (latestUserID + 1).toString();
    }

    const data = {
      id: this.id,
      username: this.username,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    readDB._data.users.push(data);

    fs.writeFileSync(this.db_path, JSON.stringify(readDB), {
      flag: "w",
    });
  }

  _find() {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r",
      })
    );

    return readDB;
  }

  _findOne(id) {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r",
      })
    );

    let filter_data = readDB;

    filter_data._data.users = filter_data._data.users.filter(
      (user) => user.id === id
    );

    if (filter_data._data.users.length === 0) {
      const err = new Error(`No user with id ${id}`);
      err.code = "404";
      throw err;
    }

    return filter_data._data.users[0];
  }

  _updateOne({ id, username, email }) {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r+",
      })
    );

    let filter_data = readDB;

    filter_data._data.users = filter_data._data.users.map((user) => {
      if (user.id === id) {
        user = {
          id: id,
          username: username,
          email: email,
          created_at: user.created_at,
          updated_at: new Date(),
        };
        return user;
      }
      return user;
    });

    fs.writeFileSync(this.db_path, JSON.stringify(filter_data), {
      flag: "w",
    });
  }

  _deleteById(id) {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r+",
      })
    );
    const dbLength = readDB._data.users.length;
    let filter_data = readDB;

    filter_data._data.users = filter_data._data.users.filter(
      (user) => user.id !== id
    );

    console.log(dbLength);

    if (filter_data._data.users.length === dbLength) {
      const err = new Error(`No user with id ${id}`);
      err.code = "404";
      throw err;
    }

    fs.writeFileSync(this.db_path, JSON.stringify(filter_data), {
      flag: "w",
    });
  }

  _deleteAll() {
    const readDB = JSON.parse(
      fs.readFileSync(this.db_path, {
        flag: "r+",
      })
    );

    readDB._data.users = [];

    fs.writeFileSync(this.db_path, JSON.stringify(readDB), {
      flag: "w",
    });
  }
};
