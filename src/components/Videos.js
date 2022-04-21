import { AgoraVideoPlayer } from "agora-rtc-react";
import { useEffect, useState } from "react";

export default function Video(props) {
  const { users } = props;
  const [gridSizing, setGridSizing] = useState("grid-cols-1");

  useEffect(() => {
    setGridSizing(`grid-cols-${users.length > 3 ? 4 : users.length}`);
  }, [users]);

  return (
    <div className={`h-full grid ${gridSizing} gap-4`}>
      {/* <AgoraVideoPlayer
        videoTrack={tracks[1]}
        style={{ height: "100%", width: "100%" }}
      /> */}
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <AgoraVideoPlayer
                videoTrack={user.videoTrack}
                key={user.uid}
                style={{ height: "100%", width: "100%" }}
              />
            );
          } else return null;
        })}
    </div>
  );
}
