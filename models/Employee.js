import DbConfig from "../config/DbConfig.js";
const sql = DbConfig.setDBConnection();

export default class Employee {
  constructor(
    firstName,
    lastName,
    dateOfJoining = new Date(),
    department,
    reportingTo,
    skillSet
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfJoining = dateOfJoining;
    this.department = department;
    this.reportingTo = reportingTo;
    this.skillSet = skillSet;
  }

  static addEmployee(newEmployee, result) {
    sql.query("INSERT INTO employees set ?", newEmployee, function (
      err,
      employee,
      fields
    ) {
      if (err) {
        result(err, null);
        throw err;
      } else {
        result(err, newEmployee);
      }
    });
  }

  static getAllEmployees(result) {
    sql.query("SELECT * FROM employees", function (err, employees, fields) {
      if (err) {
        result(err, null);
        throw err;
      } else {
        result(err, employees);
      }
    });
  }

  static getEmployeeById(id, result) {
    sql.query("SELECT * FROM employees WHERE id = ?", [id], function (
      err,
      employee,
      fields
    ) {
      if (err) {
        result(err, null);
        throw err;
      } else {
        result(err, employee);
      }
    });
  }

  static updateById(id, employeeObj, result) {
    sql.query(
      "UPDATE employees SET firstName = ?, lastName = ?, dateOfJoining = ?, department = ?, reportingTo = ?, skillSet = ? WHERE id = ?",
      [
        employeeObj.firstName,
        employeeObj.lastName,
        employeeObj.dateOfJoining,
        employeeObj.department,
        employeeObj.reportingTo,
        employeeObj.skillSet,
        id,
      ],
      function (err, employee, fields) {
        if (err) {
          result(err, null);
          throw err;
        } else {
          result(err, employee);
        }
      }
    );
  }

  static deleteById(id, result) {
    sql.query("DELETE FROM employees where id = ?", [id], function (
      err,
      employee,
      fields
    ) {
      if (err) {
        result(err, null);
        throw err;
      } else {
        result(err, employee);
      }
    });
  }
}
