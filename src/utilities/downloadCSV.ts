import config from "@/config";

export const downloadCSV = (url: string, fileName: string, token: string) => {
  fetch(config.baseUrl + url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.blob();
  })
  .then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName + new Date().getTime() + ".csv"); // The file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
  .catch((error) => {
    console.error("There was an error downloading the file:", error);
  });
};
