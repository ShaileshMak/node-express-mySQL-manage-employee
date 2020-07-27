import express from "express";
import employees from "./routes/api/employees.js";
import bodyParser from "body-parser";
import DbConfig from "./config/DbConfig.js";

const app = express();
const port = process.env.PORT || 5000;

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/employees", employees);
DbConfig.setDBConnection();
app.listen(port);
