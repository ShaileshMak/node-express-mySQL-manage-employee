import express from "express";
const { Router } = express;
const router = Router();
import Employee from "../../models/Employee.js";
import ExcelUtil from "../../utils/excelUtil.js";
//@route GET api/employees
//@des Retrives employees
//@access Public
router.get("/", (req, resp) => {
  Employee.getAllEmployees((err, employees) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Something Went Wrong" });
    } else {
      resp.json(employees);
    }
  });
});

//@route POST api/employees
//@des Add employees
//@access Public
router.post("/", (req, resp) => {
  const employee = new Employee(
    req.body.firstName,
    req.body.lastName,
    req.body.dateOfJoining,
    req.body.department,
    req.body.reportingTo,
    req.body.skillSet
  );
  Employee.addEmployee(employee, (err, empl) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Bad Request" });
    } else {
      resp.json(empl);
    }
  });
});

//@route GET api/employees
//@des get employee by id
//@access Public
router.get("/:id", (req, resp) => {
  Employee.getEmployeeById(req.params.id, (err, empl) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Bad Request" });
    } else {
      resp.json(empl);
    }
  });
});

//@route UPDATE api/employees
//@des Update employees
//@access Public
router.put("/:id", (req, resp) => {
  Employee.updateById(req.params.id, req.body, (err, empl) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Bad Request" });
    } else {
      resp.json(empl);
    }
  });
});

// @route   DELETE api/employees/:id
// @desc    Delete A Item
// @access  Private
router.delete("/:id", (req, resp) => {
  Employee.deleteById(req.params.id, (err, empl) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Bad Request" });
    } else {
      resp.json(empl);
    }
  });
});

// @route   POST api/employees/download
// @desc    downloads xls
// @access  Private
router.post("/export", (req, resp) => {
  console.log("/export GET API called");
  Employee.getAllEmployees((err, employees) => {
    if (err) {
      resp.status(404).send({ error: true, message: "Something Went Wrong" });
    } else {
      ExcelUtil.generateExcel(resp, employees);
    }
  });
});

export default router;
