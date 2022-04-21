import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import moment from "moment";
import { api } from "../constants";
import UserContext from "../contexts/UserContext";
import TestCard from "../components/TestCard";

const Test = () => {
  const { user } = useContext(UserContext);
  const [avlTests, setAvlTests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        if (user.role === "user") {
          const testsReq = await axios.post(`${api}/test/all_tests`);
          const onGoingTests = testsReq.data.filter((el) => {
            return !moment().isAfter(moment(new Date(el.endAt)));
          });
          setAvlTests(onGoingTests);
        } else if (user.role === "company") {
          const testsReq = await axios.post(`${api}/test/all_tests`);
          const testReqData = testsReq.data.filter(
            (el) => el.createdBy === user._id
          );
          setAvlTests(testReqData);
        }
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="flex flex-col w-full">
      {user && (
        <>
          <h4 className="text-white font-bold text-2xl mb-8">
            {user.role === "user" ? "Available Tests" : "My Tests"}
          </h4>
          {avlTests.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 w-full">
              {avlTests.map((test, idx) => {
                return (
                  <TestCard
                    key={idx}
                    title={test.title}
                    startAt={test.startAt}
                    endAt={test.endAt}
                    role={user.role}
                    id={test._id}
                    completed={user && user.results.includes(test._id)}
                    token={test.agoraToken}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <h4 className="text-white80 font-bold text-2xl">
                No Tests Found!
              </h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
