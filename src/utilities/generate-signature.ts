import CryptoJS from "crypto-js";

const generateSignature = (
  apiKey: string,
  apiSecret: string,
  meetingNumber: string,
  role: number
) => {
  const timestamp = new Date().getTime() - 30000;
  const msg = btoa(apiKey + meetingNumber + timestamp + role);
  const hash = CryptoJS.HmacSHA256(msg, apiSecret).toString(
    CryptoJS.enc.Base64
  );
  const signature = btoa(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  );

  return signature;
};

export default generateSignature;
