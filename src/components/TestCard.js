import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Button from "./Button";

const TestCard = ({ title, startAt, endAt, role, id, token, completed }) => {
  const history = useHistory();
  const findDuration = () => {
    return moment.duration(moment(endAt).diff(moment(startAt))).asMinutes();
  };

  // const isTestAvailable = () => {
  //   return (
  //     moment().isBefore(moment(new Date(startAt))) ||
  //     moment().isAfter(moment(new Date(endAt)))
  //   );
  // };

  return (
    <div className="bg-gradient-to-br from-boxBgStart to-boxBgEnd p-5 rounded-md shadow-md flex flex-col gap-2">
      <h4 className="text-white">Title: {title}</h4>
      <h4 className="text-white">
        Starts At: {moment(startAt).format("ddd, DD MMM h:mm a")}
      </h4>
      <h4 className="text-white">
        Ends At: {moment(endAt).format("ddd, DD MMM h:mm a")}
      </h4>
      <h4 className="text-white mb-3">Duration: {findDuration()} mins</h4>
      {role !== "company" && (
        <Button
          title={`${
            completed
              ? "Test Taken!"
              : moment().isAfter(moment(endAt))
              ? "Expired!"
              : "Start Test"
          }`}
          onClick={() => {
            if (completed) {
              toast("test already given", {
                hideProgressBar: true,
                autoClose: 2000,
                theme: "dark",
                type: "info",
              });
            } else {
              if (
                moment().isSameOrAfter(moment(startAt)) &&
                moment().isBefore(moment(endAt))
              ) {
                localStorage.setItem("agoraToken", token);
                history.push(`code/${id}`);
              } else {
                toast("test not yet started", {
                  hideProgressBar: true,
                  autoClose: 2000,
                  theme: "dark",
                  type: "info",
                });
              }
            }
          }}
          // disabled={isTestAvailable()}
        />
      )}
      {role === "company" && (
        <Button
          title={`${
            moment().isAfter(moment(endAt)) ? "Test Over!" : "View Participants"
          }`}
          onClick={() => {
            if (
              moment().isSameOrAfter(moment(startAt)) &&
              moment().isBefore(moment(endAt))
            ) {
              localStorage.setItem("agoraToken", token);
              history.push("/video/" + id);
            } else {
              if (moment().isBefore(moment(startAt))) {
                toast("test not started", {
                  hideProgressBar: true,
                  autoClose: 2000,
                  theme: "dark",
                  type: "info",
                });
              } else if (moment().isAfter(moment(endAt))) {
                toast("test over", {
                  hideProgressBar: true,
                  autoClose: 2000,
                  theme: "dark",
                  type: "info",
                });
              }
            }
          }}
          // disabled={isTestAvailable()}
        />
      )}
    </div>
  );
};

export default TestCard;
