import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Browse Mux Elements</h1>
      <ul>
        <li>
          <h3>
            <Link to="/MuxVideo">Mux Video Demo</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link to="/MuxAudio">Mux Audio Demo</Link>
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default Home;
