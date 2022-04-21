import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../constants";
import Input from "../components/Input";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [limit, setLimit] = useState("");
  const [marks, setMarks] = useState("");
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [out1, setOut1] = useState("");
  const [out2, setOut2] = useState("");

  const addQuestion = async () => {
    if (!question || !limit || !marks || !inp1 || !out1 || !inp2 || !out2) {
      toast("fill all the details", {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "info",
      });
      return;
    }

    try {
      const addQuesReq = await axios.post(`${api}/test/add_question`, {
        topic: "Strings",
        question: question,
        limit: limit,
        marks: marks,
        testCases: {
          inp1: inp1,
          out1: out1,
          inp2: inp2,
          out2: out2,
        },
      });
      if (addQuesReq.data.success && addQuesReq.data.error === null) {
        toast("question added successfully!", {
          hideProgressBar: true,
          autoClose: 2000,
          theme: "dark",
          type: "success",
        });
        setQuestion("");
        setLimit(0);
        setMarks(0);
        setInp1("");
        setOut1("");
        setInp2("");
        setOut2("");
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
      <h4 className="text-white font-bold text-2xl mb-8">Add Question</h4>
      <div className="flex gap-5 flex-col max-w-md">
        <Input
          placeholder={"question"}
          type={"text"}
          val={question}
          setVal={setQuestion}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"limit (in seconds)"}
          type={"number"}
          val={limit}
          setVal={setLimit}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"marks"}
          type={"number"}
          val={marks}
          setVal={setMarks}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"input1"}
          type={"text"}
          val={inp1}
          setVal={setInp1}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"output1"}
          type={"text"}
          val={out1}
          setVal={setOut1}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"input2"}
          type={"text"}
          val={inp2}
          setVal={setInp2}
          bg="bg-primaryDark"
        />
        <Input
          placeholder={"output2"}
          type={"text"}
          val={out2}
          setVal={setOut2}
          bg="bg-primaryDark"
        />
        <div className="w-full">
          <button
            className="h-10 bg-primaryDark border-none outline-none rounded-md text-white font-bold w-1/2"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
