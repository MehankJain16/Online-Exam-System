import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export const api = "https://testsystemserver.herokuapp.com/api";

// Agora Constants START //
export const APP_ID = "0522286a30694cb49a55f640cd868324";
export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: APP_ID,
  token:
    "0060522286a30694cb49a55f640cd868324IAC4dDpLPlBWRLxZp5kGKyWaF84A0PJPmdqHpaXmW0ctJFuPd5UAAAAAEAClV51HQ1sfYgEAAQBDWx9i",
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "mychannel1";
// Agora Constants END //

export const LANGUAGES = [
  { value: "python", label: "Python", language: "python3", version: "4" },
  { value: "java", label: "Java", language: "java", version: "4" },
  { value: "c_cpp", label: "C++", language: "cpp", version: "5" },
];
export const colorStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#131828",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    ":hover": {
      border: "none",
      boxShadow: "none",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#252C43",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#131828",
    color: "rgba(255,255,255,0.8)",
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#131828",
    ":hover": {
      backgroundColor: "#252C43",
    },
  }),
};
