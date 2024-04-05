/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.8.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

interface PropsType {
  meetingNumber: string;
  userName: string;
  userEmail: string;
  passWord: string;
  signature: string;
  apiKey: string;
}

const ZoomMeeting: React.FC<PropsType> = ({
  meetingNumber,
  userName,
  userEmail,
  passWord,
  signature,
  apiKey,
}) => {
  useEffect(() => {
    ZoomMtg.init({
      leaveUrl: window.location.href,
      success: () => {
        ZoomMtg.join({
          signature,
          apiKey,
          meetingNumber,
          userName,
          userEmail,
          passWord,
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }, []);

  return <div id="zmmtg-root"></div>;
};

export default ZoomMeeting;
