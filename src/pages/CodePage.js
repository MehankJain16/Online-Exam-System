import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createClient } from "agora-rtc-react";
import { api, APP_ID, useMicrophoneAndCameraTracks } from "../constants";
import Editor from "../components/Editor";
import UserContext from "../contexts/UserContext";

// Agora Setup
const config = {
  mode: "rtc",
  codec: "vp8",
  appId: APP_ID,
  token: localStorage.getItem("agoraToken"),
};
const useClient = createClient(config);

const CodePage = () => {
  const history = useHistory();
  const { testid } = useParams();
  const { getUserDetails } = useContext(UserContext);
  const [test, setTest] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionData, setCurrentQuestionData] = useState();
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: "Python",
    value: "python",
    language: "python3",
    version: "4",
  });
  const [testMarks, setTestMarks] = useState(0);

  // Agora States
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const submitQuestion = async () => {
    if (!code) {
      toast("code cannot be empty!", {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "info",
      });
      return;
    }

    try {
      const submitQues = await axios.post(`${api}/test/submit_question`, {
        script: code,
        language: selectedLanguage.language,
        versionIndex: selectedLanguage.version,
        questionId: currentQuestionData._id,
      });
      if (submitQues.data.success && submitQues.data.error === null) {
        toast("right code!", {
          hideProgressBar: true,
          autoClose: 2000,
          theme: "dark",
          type: "success",
        });
        var testM;
        setTestMarks((prev) => {
          testM = prev + currentQuestionData.marks;
          return testM;
        });
        setSelectedLanguage({
          label: "Python",
          value: "python",
          language: "python3",
          version: "4",
        });
        setCode("");
        const qlength = test.questions.length;
        if (currentQuestion < qlength - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setCurrentQuestionData(test.questions[currentQuestion + 1]);
        } else if (currentQuestion === qlength - 1) {
          // add test to history
          await axios.post(`${api}/test/register_test`, {
            testId: testid,
            marks: testM,
          });
          await getUserDetails();
          history.push("/");
        }
        return;
      }
    } catch (error) {
      toast(error.response.data.error, {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "error",
      });
      setSelectedLanguage({
        label: "Python",
        value: "python",
        language: "python3",
        version: "4",
      });
      setCode("");
      const qlength = test.questions.length;
      if (currentQuestion < qlength - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setCurrentQuestionData(test.questions[currentQuestion + 1]);
      } else if (currentQuestion === qlength - 1) {
        // add test to history
        await axios.post(`${api}/test/register_test`, {
          testId: testid,
          marks: testMarks,
        });
        await getUserDetails();
        history.push("/");
      }
      return;
    }
  };

  useEffect(() => {
    // fetch test details
    const fetch = async () => {
      console.log("Here");
      const testReq = await axios.post(`${api}/test/test`, {
        id: testid,
      });
      setTest(testReq.data);
      setCurrentQuestionData(testReq.data.questions[0]);
    };
    fetch();
  }, [testid, client]);

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        if (test !== null && test !== undefined) {
          init(test.channelName);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [test, client, ready, tracks]);

  return (
    <div className="p-8">
      <h4 className="text-white font-bold text-3xl">{test && test.title}</h4>
      <br />
      {test &&
        test.questions.map((q, idx) => {
          return (
            <Editor
              key={q._id}
              question={`Q${idx + 1}. ${q.question}`}
              visible={idx === currentQuestion}
              code={code}
              setCode={setCode}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              currentQuestionData={currentQuestionData}
            />
          );
        })}
      <br />
      <button
        className="bg-primaryDark text-sm rounded-md text-white py-2 px-3"
        onClick={() => {
          submitQuestion();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CodePage;
