import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createClient } from "agora-rtc-react";
import { api, APP_ID, useMicrophoneAndCameraTracks } from "../constants";
import Video from "../components/Videos";

// Agora Setup
const config = {
  mode: "rtc",
  codec: "vp8",
  appId: APP_ID,
  token: localStorage.getItem("agoraToken"),
};
const useClient = createClient(config);

const VideoPage = () => {
  const { testid } = useParams();
  const [testData, setTestData] = useState();

  // Agora States
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // fetch test details
    const fetch = async () => {
      const testReq = await axios.post(`${api}/test/test`, {
        id: testid,
      });
      const testDetails = testReq.data;
      setTestData(testDetails);
    };
    fetch();
  }, [testid]);

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
        if (testData !== null && testData !== undefined) {
          init(testData.channelName);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      // const cleanfunc = async () => {
      //   await client.leave();
      //   client.removeAllListeners();
      //   tracks[0].close();
      //   tracks[1].close();
      // };
      // cleanfunc();
    };
  }, [testData, client, ready, tracks]);

  return (
    <div className="p-8 h-full">
      {testData && <h4 className="text-2xl text-white">{testData.title}</h4>}
      {start && tracks && <Video tracks={tracks} users={users} />}
    </div>
  );
};

export default VideoPage;
