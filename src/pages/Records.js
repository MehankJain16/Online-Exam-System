import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { api, colorStyles } from "../constants";
import UserContext from "../contexts/UserContext";

const Records = () => {
  const { user } = useContext(UserContext);
  const [selectedTest, setSelectedTest] = useState();
  const [selectedTestData, setSelectedTestData] = useState();
  const [testsList, setTestsList] = useState([]);
  const [resultsList, setResultsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const testReq = await axios.post(`${api}/test/my_tests`);
        setTestsList(testReq.data);
      }
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      if (selectedTestData !== undefined) {
        const testMarksTotal = selectedTestData.questions
          .map((el) => el.marks)
          .reduce((prev, next) => prev + next);
        const usersList = await axios.post(`${api}/test/getRecords`, {
          testId: selectedTestData._id,
        });
        const myRecordsList = usersList.data.map((el) => ({
          name: el.name,
          scoredMarks: el.results.filter(
            (elem) => elem.testId._id === selectedTestData._id
          )[0].marks,
          testMarks: testMarksTotal,
        }));
        setResultsList(myRecordsList);
      }
    };
    fetch();
  }, [selectedTestData]);

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-white font-bold text-2xl mb-8">Test Records</h4>
      <div className="max-w-md">
        <Select
          value={selectedTest}
          styles={colorStyles}
          options={testsList.map((op) => ({
            value: op._id,
            label: op.title,
          }))}
          onChange={(options) => {
            setSelectedTest(options);
            setSelectedTestData(
              testsList.filter((el) => el._id === options.value)[0]
            );
          }}
          placeholder="Select test"
        />
      </div>
      <br />
      {resultsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {resultsList.map((record, idx) => {
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-boxBgStart to-boxBgEnd p-5 rounded-md shadow-md flex flex-col gap-2"
              >
                <h4 className="text-white text-base font-semibold">
                  {record.name}
                </h4>
                <h4 className="text-white80 text-sm">
                  Marks: {record.scoredMarks} / {record.testMarks}
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {selectedTestData !== undefined && (
            <div className="w-full flex justify-center items-center">
              <h4 className="text-white80 font-bold text-2xl">
                No Records Found!
              </h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Records;
