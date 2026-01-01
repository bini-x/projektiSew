import { useEffect, useState } from "react";
import "../index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Profili() {
  const [perdoruesiData, setPerdoruesiData] = useState({});
  const [shpalljaData, setShpalljaData] = useState([]);
  const [shpalljaKlikuarId, setShpalljaKlikuarId] = useState(false);
  const [shpalljaKlikuar, setShpalljaKlikuar] = useState(null);
  const [aplikimet, setAplikimet] = useState([]);
  const [aplikimiKlikuar, setAplikimiKlikuar] = useState(null);
  const [fshehShpalljenKlikuar, setFshehShpalljenKlikuar] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profili/${id}`,
        );
        setPerdoruesiData(response.data.data);
        // console.log(perdoruesiData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/kompania",
        );
        if (Array.isArray(response.data.data)) {
          const shpalljetFiltruara = response.data.data.filter((shpallja) => {
            return shpallja.emailKompanise === perdoruesiData.email;
          });

          if (shpalljetFiltruara.length > 0) {
            setShpalljaData(shpalljetFiltruara);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [perdoruesiData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!shpalljaKlikuarId) {
        setAplikimet([]);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/shpallja/${shpalljaKlikuarId}/aplikimet`,
        );

        if (response.data.success) {
          setAplikimet(response.data.aplikimet);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [shpalljaKlikuarId]);

  useEffect(() => {
    console.log("shpallja: ", shpalljaData);
  }, [shpalljaData]);

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

  const hapShpalljen = (shpallja) => {
    setShpalljaKlikuarId(shpallja._id);
    setShpalljaKlikuar(shpallja);
  };

  const modifikoShpalljen = (e) => {
    const { id, value } = e.target;
    setShpalljaKlikuar({
      ...shpalljaKlikuar,
      [id]: value,
    });
  };

  const fshijShpalljen = async (idShpallja) => {
    try {
      const confirmed = window.confirm(
        "A jeni i sigurt qe doni ta fshini shpalljen?",
      );

      if (confirmed) {
        await axios.delete(`http://localhost:3000/api/shpallja/${idShpallja}`);

        setShpalljaData(shpalljaData.filter((sh) => sh._id !== idShpallja));
        setShpalljaKlikuar(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ruajNdryshimet = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/shpallja/${shpalljaKlikuar._id}`,
        shpalljaKlikuar,
      );

      setShpalljaData(
        shpalljaData.map((sh) =>
          sh._id === shpalljaKlikuar._id ? shpalljaKlikuar : sh,
        ),
      );

      alert("Ndryshimet u ruajten");
      setShpalljaKlikuar(null);
    } catch (error) {
      console.error(error);
    }
  };

  const hapAplikimin = async (aplikimi) => {
    setAplikimiKlikuar(aplikimi);
  };

  return (
    <div>
      {/* <img src="" alt="Foto e Profilit" /> */}
      <h1>{perdoruesiData.emri || perdoruesiData.kompania}</h1>
      <h2>{perdoruesiData.mbiemri}</h2>
      <p>{perdoruesiData.email}</p>
      {shpalljaData.map((sh) => {
        return (
          <div
            className="border m-2 p-2"
            key={sh._id}
            onClick={() => hapShpalljen(sh)}
          >
            <h3>Shpallja e Punes:</h3>
            <div className="border m-2 p-2">
              <p>Pozita e Punes: {sh.pozitaPunes}</p>
              <p>Lokacioni: {sh.lokacioniPunes}</p>
              <p>Niveli: {sh.niveliPunes}</p>
            </div>

            <button
              className="publikoPune cursor-pointer"
              type="button"
              onClick={() => hapShpalljen(sh)}
            >
              Shiko Me Shume
            </button>
          </div>
        );
      })}

      {shpalljaKlikuar && (
        <div
          className={`border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl ${fshehShpalljenKlikuar ? "hidden" : "block"}`}
        >
          <form onSubmit={ruajNdryshimet}>
            <label htmlFor="pozitaPunes">Pozita e punes:</label>
            <input
              id="pozitaPunes"
              type="text"
              value={shpalljaKlikuar.pozitaPunes || ""}
              onChange={modifikoShpalljen}
              className="border"
            />
            <label htmlFor="lokacioniPunes">Lokacioni i punes:</label>
            <input
              id="lokacioniPunes"
              type="text"
              value={shpalljaKlikuar.lokacioniPunes || ""}
              onChange={modifikoShpalljen}
              className="border"
            />

            <label htmlFor="niveliPunes">Niveli i punes:</label>
            <input
              id="niveliPunes"
              type="text"
              value={shpalljaKlikuar.niveliPunes || ""}
              onChange={modifikoShpalljen}
              className="border"
            />
            <label htmlFor="pershkrimiPunes">Pershkrimi i punes:</label>
            <textarea
              id="pershkrimiPunes"
              type="text"
              value={shpalljaKlikuar.pershkrimiPunes || ""}
              onChange={modifikoShpalljen}
              className="border"
            />
            <button
              type="button"
              className="publikoPune bg-red-500! cursor-pointer"
              onClick={() => fshijShpalljen(shpalljaKlikuar._id)}
            >
              Fshij Shpalljen
            </button>
            <button type="submit" className="publikoPune cursor-pointer">
              Perfundo
            </button>
          </form>
          <div className="mt-6">
            <h4 className="font-bold mb-2">Aplikimet ({aplikimet.length}):</h4>

            {aplikimet.length === 0 ? (
              <p className="text-gray-500">Nuk ka aplikime</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {aplikimet.map((a) => (
                  <div key={a._id} className="border p-2 flex justify-between">
                    <div>
                      <p className="font-medium">
                        {a.emriAplikantit} {a.mbiemriAplikantit}
                      </p>
                      <p className="text-sm text-gray-600">
                        {a.emailAplikantit}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="publikoPune"
                        onClick={() => {
                          hapAplikimin(a);
                          setFshehShpalljenKlikuar(!fshehShpalljenKlikuar);
                        }}
                      >
                        Shiko Me Shume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => {
              setShpalljaKlikuar(null);
            }}
          ></FontAwesomeIcon>
        </div>
      )}

      {aplikimiKlikuar && (
        <div className="border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl">
          <div className="space-y-2 overflow-y-auto">
            <p>Emri: {aplikimiKlikuar.emriAplikantit}</p>
            <p>Mbiemri: {aplikimiKlikuar.mbiemriAplikantit}</p>
            <p>Email: {aplikimiKlikuar.emailAplikantit}</p>
            <p>eksperienca</p>
            <p>niveli</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setAplikimiKlikuar(null);
                setFshehShpalljenKlikuar(false);
              }}
            ></FontAwesomeIcon>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profili;
