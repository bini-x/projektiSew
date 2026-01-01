import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

function Aplikimi() {
  const [shpallja, setShpallja] = useState(null);
  const [aplikimi, setAplikimi] = useState({
    emailKompanise: "",
    emailAplikantit: "",
    emriAplikantit: "",
    mbiemriAplikantit: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/shpallja/${id}/aplikimi`,
        );
        setShpallja(response.data.data);
      } catch (error) {
        console.log("Error:", error);
        setShpallja(null);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    console.log("shpallja:", shpallja);
  }, [shpallja]);

  const shtoAplikimin = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        emailKompanise: shpallja.emailKompanise,
        emailAplikantit: aplikimi.emailAplikantit,
        emriAplikantit: aplikimi.emriAplikantit,
        mbiemriAplikantit: aplikimi.mbiemriAplikantit,
      };

      const response = await axios.post(
        `http://localhost:3000/api/shpallja/${id}/aplikimi`,
        dataToSend,
      );

      if (response.data.success) {
        alert("Aplikimi u dergua me sukses!");
        console.log(aplikimi);
        setAplikimi(aplikimi);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!shpallja) {
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
    <div>
      <p>Pozita e Punes: {shpallja.pozitaPunes}</p>
      <p>Kategoria e Punes: {shpallja.kategoriaPunes}</p>
      <p>Kompania: {shpallja.emailKompanise}</p>
      <form onSubmit={shtoAplikimin}>
        <div className="flex flex-col">
          <label htmlFor="emri">Emri</label>
          <input
            id="emri"
            type="text"
            className="border w-fit"
            placeholder="Sheno Emrin"
            onChange={(e) =>
              setAplikimi({ ...aplikimi, emriAplikantit: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mbiemri">Mbiemri</label>
          <input
            id="mbiemri"
            type="text"
            className="border w-fit"
            placeholder="Sheno Mbiemrin"
            onChange={(e) =>
              setAplikimi({ ...aplikimi, mbiemriAplikantit: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="border w-fit"
            placeholder="Sheno Email"
            onChange={(e) =>
              setAplikimi({ ...aplikimi, emailAplikantit: e.target.value })
            }
          />
        </div>

        <button type="submit" className="publikoPune">
          Apliko
        </button>
      </form>
    </div>
  );
}

export default Aplikimi;
