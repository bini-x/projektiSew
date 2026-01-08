import { useState } from "react";
import { useEffect } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ShpalljaProfil from "./ShpalljaProfil";

function Profili() {
  const navigate = useNavigate();
  const [perdoruesiData, setPerdoruesiData] = useState({});
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

  useEffect(() => {
    console.log("perdoruesi: ", perdoruesiData);
  }, [perdoruesiData]);

  const handleCkycja = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ckycja/perdoruesi",
        {},
        { withCredentials: true },
      );

      setPerdoruesiData(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      console.log("Ckycja u be", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setPerdoruesiData(null);
      localStorage.clear();
    }
  };

  return (
    <div>
      <Header perdoruesiData={perdoruesiData} onCkycja={handleCkycja} />

      <h1> {perdoruesiData?.emri || perdoruesiData?.kompania}</h1>
      <h2>{perdoruesiData?.mbiemri}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-10 md:m-15 lg:m-20">
        <ShpalljaProfil />
      </div>
    </div>
  );
}

export default Profili;
