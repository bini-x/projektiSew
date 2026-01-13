import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function KonfigurimetLlogarise() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let dataToSend;

      if (perdoruesiData.tipiPerdoruesit === "aplikant") {
        dataToSend = {
          tipiPerdoruesit: "aplikant",
          emri: perdoruesiData.emri,
          mbiemri: perdoruesiData.mbiemri,
          email: perdoruesiData.email,
          fjalekalimi: perdoruesiData.fjalekalimi,
        };
      } else if (perdoruesiData.tipiPerdoruesit === "punedhenes") {
        dataToSend = {
          tipiPerdoruesit: "punedhenes",
          kompania: perdoruesiData.kompania,
          email: perdoruesiData.email,
          fjalekalimi: perdoruesiData.fjalekalimi,
        };
      }

      const response = await axios.put(
        `http://localhost:3000/api/profili/${id}`,
        dataToSend,
      );

      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const modifikoProfilin = (e) => {
    const { id, value } = e.target;
    setPerdoruesiData({
      ...perdoruesiData,
      [id]: value,
    });
  };

  return (
    <div>
      <p> Konfigurimet</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Perditeso email</label>
        <input
          id="email"
          type="text"
          className="border"
          onChange={modifikoProfilin}
        />
        <label htmlFor="fjalekalimi">Perditeso fjalekalimin</label>
        <input
          id="fjalekalimi"
          type="text"
          className="border"
          onChange={modifikoProfilin}
        />
        <input id="fjalekalimi" type="text" className="border" />
        <label htmlFor=""></label>
        <input type="text" />
        <button type="submit" className="publikoPune">
          Perfundo
        </button>
      </form>
    </div>
  );
}

export default KonfigurimetLlogarise;
