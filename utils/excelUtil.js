import Moment from "moment";
import exceljs from "exceljs";

export default class ExcelUtil {
  static generateExcel(resp, employees) {
    console.log("GENERATE EXCELL CALLED");
    resp.writeHead(200, {
      "Content-Disposition": 'attachment; filename="employeeDetails.xlsx"',
      "Transfer-Encoding": "chunked",
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const { stream } = exceljs;
    const workbook = new stream.xlsx.WorkbookWriter({ stream: resp });
    const worksheet = workbook.addWorksheet("employees");
    workbook.creator = "Shailesh Mak";
    workbook.lastModifiedBy = "Me";
    workbook.created = new Date();
    worksheet.columns = [
      { header: "#", key: "no", width: 10, outlineLevel: 1 },
      { header: "Name", key: "name", width: 30, outlineLevel: 1 },
      {
        header: "Date of Joinging",
        key: "doj",
        width: 10,
        outlineLevel: 1,
      },
      {
        header: "Department",
        key: "department",
        width: 15,
        outlineLevel: 1,
      },
      {
        header: "Reporting To",
        key: "reportingTo",
        width: 30,
        outlineLevel: 1,
      },
      {
        header: "Skill Sets",
        key: "skillSets",
        width: 40,
        outlineLevel: 1,
      },
    ];
    employees.map((employee, index) => {
      worksheet.addRow({
        no: index + 1,
        name: `${employee.firstName} ${employee.lastName}`,
        doj: Moment(employee.dateOfJoining).format("YYYY-MM-DD"),
        department: employee.department,
        reportingTo: employee.reportingTo,
        skillSets: employee.skillSet,
      });
    });
    worksheet.commit();
    workbook.commit();
  }
}
