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
  const [aplikimetPerdoruesit, setAplikimetPerdoruesit] = useState([]);
  const [shpallja, setShpallja] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/aplikimet",
        );

        if (Array.isArray(response.data.data)) {
          const aplikimetFiltruara = response.data.data.filter((aplikimi) => {
            return aplikimi.emailAplikantit === perdoruesiData.email;
          });

          if (aplikimetFiltruara.length > 0) {
            setAplikimetPerdoruesit(aplikimetFiltruara);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [perdoruesiData.email]);

  useEffect(() => {
    const fetchData = async () => {
      const shpalljet = [];

      for (const aplikimi of aplikimetPerdoruesit) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/shpallja/${aplikimi.shpalljaId}`,
          );

          shpalljet.push(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }

      setShpallja(shpalljet);
    };

    fetchData();
  }, [aplikimetPerdoruesit]);

  useEffect(() => {
    console.log("aplikimet: ", aplikimetPerdoruesit);
  }, [aplikimetPerdoruesit]);

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
      <p>{perdoruesiData.email}</p>
      {aplikimetPerdoruesit.map((a) => {
        return (
          <div key={a._id}>
            <p>{a.shpalljaId}</p>
          </div>
        );
      })}
      {shpallja.map((sh) => {
        return (
          <div key={sh._id}>
            <p>{sh.pozitaPunes}</p>
          </div>
        );
      })}

      <ShpalljaProfil />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 md:m-15 lg:m-20"></div>
    </div>
  );
}

export default Profili;
