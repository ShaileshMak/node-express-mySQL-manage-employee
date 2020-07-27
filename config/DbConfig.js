import mysql from "mysql";

export default class DBConfig {
  static setDBConnection() {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "mern_employee",
    });

    connection.connect();
    return connection;
  }
}
