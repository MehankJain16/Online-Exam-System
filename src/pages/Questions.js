import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../constants";
import UserContext from "../contexts/UserContext";

const Questions = () => {
  const { user } = useContext(UserContext);
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const questionsReq = await axios.post(`${api}/test/all_questions`);
        setQuestionsList(
          questionsReq.data.filter((el) => el.createdBy === user._id)
        );
      }
    };
    fetch();
  }, [user]);
  return (
    <div className="flex flex-col w-full">
      <h4 className="text-white font-bold text-2xl mb-8">
        Questions{" "}
        <Link
          to="/addQuestion"
          className="cursor-pointer py-2 px-3 bg-primaryDark text-sm rounded-md ml-2"
        >
          Add Question
        </Link>
      </h4>
      {questionsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {questionsList.map((question, idx) => {
            return (
              <div
                key={question._id}
                className="bg-gradient-to-br from-boxBgStart to-boxBgEnd p-5 rounded-md shadow-md flex flex-col gap-2"
              >
                <h4 className="text-white text-base font-semibold">
                  Q.{idx + 1} {question.question}
                </h4>
                <h4 className="text-white80 text-sm">
                  Marks: {question.marks}
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h4 className="text-white80 font-bold text-2xl">
            No Questions Found!
          </h4>
        </div>
      )}
    </div>
  );
};

export default Questions;
