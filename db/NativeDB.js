const fs = require("fs");
const User = require("./User");

class NativeDB {
  User = (...args) => {
    return new User(...args);
  };

  connect(dbName) {
    const storage_path = __dirname + "/storage/" + dbName + ".json";
    if (fs.existsSync(storage_path)) {
      console.log("DB exists.");
    } else {
      console.log("DB does not exists.\ncreating new db...");
    }
    console.log("Server is connected with db.");
  }
}

module.exports = {
  NativeDB,
};
