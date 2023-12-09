import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { API_URL } from "./config";

function App() {
  const [videos, setVideos] = useState([{ name: "bigbuck" }, { name: "sample" }]);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    // getAllVideosList();
  }, []);

  const getAllVideosList = async () => {
    const url = `${API_URL}/getVideos`;
    // const videos_ = await response.json();
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success: ", response);
        setVideos(response);
      })
      .catch((error) => console.error("Error: ", error));
  };

  function updateVideoId(e, id) {
    e.preventDefault();
    setVideoId(id);
  }
  return (
    <div className="App">
      {videoId && <VideoPlayer videoId={videoId} />}
      <div className="videos">
        {videos.map((item) => {
          return (
            <div key={item.name}>
              <button onClick={(e) => updateVideoId(e, item.name)}>
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
