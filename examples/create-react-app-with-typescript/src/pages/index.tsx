import { Link } from "react-router-dom";

function Home() {
  return (
    <nav>
      <ul>
        <li><Link to="./MuxVideo" className="video">&lt;MuxVideo&gt;</Link></li>
        <li><Link to="./MuxAudio" className="audio">&lt;MuxAudio&gt;</Link></li>
        <li><Link to="./MuxPlayer" className="player">&lt;MuxPlayer&gt;</Link></li>
        <li><Link to="./MuxUploader" className="uploader">&lt;MuxUploader&gt;</Link></li>
      </ul>
    </nav>
  );
}

export default Home;
