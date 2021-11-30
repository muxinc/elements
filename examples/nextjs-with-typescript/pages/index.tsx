import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>Browse Mux Elements</h1>
      <ul>
        <li>
          <h3>
            <Link href="/MuxVideo">
              <a>Mux Video Demo</a>
            </Link>
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
