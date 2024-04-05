import CryptoJS from "crypto-js";

const generateSignature = (
  apiKey: string,
  apiSecret: string,
  meetingNumber: string,
  role: number
) => {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
    "base64"
  );
  const hash = CryptoJS.HmacSHA256(msg, apiSecret).toString(
    CryptoJS.enc.Base64
  );
  const signature = Buffer.from(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");

  return signature;
};

export default generateSignature;
