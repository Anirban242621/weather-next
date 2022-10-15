import Head from "next/head";
import Image from "next/image";
import SearchBox from "../components/SearchBox";
import background from "../public/images/background.svg";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Anirban K Majumdar - NEXT JS</title>
      </Head>
      <div
        className="home"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="container">
          <SearchBox placeholder="Search for a city" />
          <h4
            style={{ textAlign: "center", marginTop: "40vh", color: "#05445E" }}
          >
            Developed and Designed by 💙 <br />
            <a
              style={{ textDecoration: "none", color: "#189AB4" }}
              href="https://anirban-majumdar-97.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anirban K Majumdar
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}
