import generateSignature from "@/utilities/generate-signature";
import ZoomMeeting from "./ZoomMeeting";

const ZOOM_CLIENT_KEY = "IBsehNyfSq25fTtd4XO3Kg";
const ZOOM_CLIENT_SECRET = "N34p4nxAyegiPeJQ64xw7J1ts0LlKHK5";
const ZOOM_ACCOUNT_ID = "8Q2fLacLScuTF7CeLyef9g";
const ZOOM_API_KEY = "3EOTMvPXSi2mFPGVTNaAnw";
const ZOOM_API_SECRET = "YJ5LylLyskdVsW4ed872ainMVjROCeWY";

const Room = () => {
  const signature = generateSignature(
    ZOOM_API_KEY,
    ZOOM_API_SECRET,
    "88377230642",
    0
  );

  return (
    <div>
      <ZoomMeeting
        meetingNumber="88377230642"
        userName="Denny Kate"
        userEmail="dennykate22@gmail.com"
        passWord="HNw5YZ"
        signature={signature}
        apiKey={ZOOM_API_KEY}
      />
    </div>
  );
};

export default Room;
