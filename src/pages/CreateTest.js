import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import Select from "react-select";
import { api, colorStyles } from "../constants";
// import UserContext from "../contexts/UserContext";
import Input from "../components/Input";

const CreateTest = () => {
  //   const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const questionsReq = await axios.post(`${api}/test/all_questions`);
      setQuestionsList(questionsReq.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const d = moment
        .duration(moment(new Date(endTime)).diff(moment(new Date(startTime))))
        .asMinutes();
      setDuration(`${d} mins`);
    }
  }, [startTime, endTime]);

  const createTest = async () => {
    if (!title || !startTime || !endTime || selectQuestions.length < 1) {
      toast("fill all the details", {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "info",
      });
      return;
    }

    try {
      const addQuesReq = await axios.post(`${api}/test/add_test`, {
        title: title,
        startAt: new Date(startTime).getTime(),
        endAt: new Date(endTime).getTime(),
        questions: selectQuestions.map((q) => q.value),
      });
      if (addQuesReq.data.success && addQuesReq.data.error === null) {
        toast("test created successfully!", {
          hideProgressBar: true,
          autoClose: 2000,
          theme: "dark",
          type: "success",
        });
        setTitle("");
        setStartTime("");
        setEndTime("");
        setDuration("");
        setSelectQuestions([]);
        return;
      }
    } catch (error) {
      toast(error.response.data.error, {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "error",
      });
      return;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-white font-bold text-2xl mb-8">Create Test</h4>
      <div className="flex gap-5 flex-col max-w-md">
        <Input
          placeholder={"title"}
          type={"text"}
          val={title}
          setVal={setTitle}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"start at"}
          type={"datetime-local"}
          val={startTime}
          setVal={setStartTime}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"end at"}
          type={"datetime-local"}
          val={endTime}
          setVal={setEndTime}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"duration"}
          type={"text"}
          val={duration}
          setVal={setDuration}
          bg="bg-primaryDark"
          disabled={true}
        />
        <Select
          value={selectQuestions}
          styles={colorStyles}
          isMulti
          options={questionsList.map((op) => ({
            value: op._id,
            label: op.question,
          }))}
          onChange={(options) => {
            setSelectQuestions(options);
          }}
          placeholder="Select questions"
        />
        <div className="w-full">
          <button
            className="h-10 bg-primaryDark border-none outline-none rounded-md text-white font-bold w-1/2"
            onClick={createTest}
          >
            Create Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
