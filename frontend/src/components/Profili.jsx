import { useEffect, useState } from "react";
import "../index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ShpalljaCard from "./ShpalljaCard";

function Profili() {
  const [perdoruesiData, setPerdoruesiData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profili/${id}`,
        );
        setPerdoruesiData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!perdoruesiData) {
    return (
      <div>
        <Header />
        <div className="text-center p-10">
          <p>Diqka shkoi keq!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* <img src="" alt="Foto e Profilit" /> */}
      <h1>{perdoruesiData.emri || perdoruesiData.kompania}</h1>
      <h2>{perdoruesiData.mbiemri}</h2>
      <p>{perdoruesiData.email}</p>
    </div>
  );
}

export default Profili;
