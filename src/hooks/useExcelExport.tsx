/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ExcelJS from "exceljs";
import moment from "moment";

const useExcelExport = (
  filename: string = `${Math.floor(Math.random() * 1000000)}`
) => {
  const escapeCols = ["image"];

  const toDataURL = (url: string) => {
    const promise = new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = function () {
          resolve({ base64Url: reader.result });
        };
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });

    return promise;
  };

  const excelExport = (data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 50;

    sheet.getRow(1).font = {
      size: 12,
      bold: true,
    };

    const columns:
      | Partial<ExcelJS.Column>[]
      | { header: string; key: string; width: number }[] = [];

    Object.keys(data[0]).forEach((key: string) => {
      if (escapeCols.includes(key) || key.includes("id")) return;

      columns.push({
        header: key,
        key,
        width: 30,
      });
    });

    sheet.columns = columns;

    const promise = Promise.all(
      data?.map(async (dt, index: number) => {
        const rowNumber = index + 1;

        const newData: { [key: string]: any } = {};

        Object.entries(dt).forEach(([key, value]) => {
          if (key !== "image") {
            newData[key] = value;
          }
        });

        sheet.addRow(newData);

        if (dt.image) {
          const result: any = await toDataURL(dt.image);
          const splitted = dt.image.split(".");
          const extName = splitted[splitted.length - 1];

          const imageId2 = workbook.addImage({
            base64: result.base64Url,
            extension: extName,
          });

          sheet.addImage(imageId2, {
            tl: { col: 6, row: rowNumber },
            ext: { width: 40, height: 40 },
          });
        }
      })
    );

    promise.then(() => {
      sheet.eachRow({ includeEmpty: true }, function (row) {
        row.eachCell({ includeEmpty: true }, function (cell) {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        });
      });

      workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download =
          moment().format("DD-MM-YYYY-dddd-") + filename + ".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return { excelExport };
};

export default useExcelExport;
