import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../constants";
import UserContext from "../contexts/UserContext";

const History = () => {
  const { user } = useContext(UserContext);
  const [testsList, setTestsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const testReq = await axios.post(`${api}/test/tests_history`);
        setTestsList(testReq.data.results);
      }
    };
    fetch();
  }, [user]);
  return (
    <div className="flex flex-col w-full">
      <h4 className="text-white font-bold text-2xl mb-8">Tests History</h4>
      {testsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {testsList.map((test, idx) => {
            return (
              <div
                key={test.testId._id}
                className="bg-gradient-to-br from-boxBgStart to-boxBgEnd p-5 rounded-md shadow-md flex flex-col gap-2"
              >
                <h4 className="text-white text-base font-semibold">
                  {test.testId.title}
                </h4>
                <h4 className="text-white80 text-sm">
                  Marks Scored: {test.marks}
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h4 className="text-white80 font-bold text-2xl">No History Found!</h4>
        </div>
      )}
    </div>
  );
};

export default History;
