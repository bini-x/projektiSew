import axios from "axios";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PublikoPune() {
  const navigate = useNavigate();
  const [pyetjet, setPyetjet] = useState([]);
  const [pyetjaTanishme, setPyetjaTanishme] = useState("");
  const [formData, setFormData] = useState({
    pozitaPunes: "",
    kategoriaPunes: "",
    lokacioniPunes: "",
    pershkrimiPunes: "",
    niveliPunes: "",
    llojiPunesimit: "",
  });

  const shtoPyetjen = () => {
    if (pyetjaTanishme.trim()) {
      setPyetjet([...pyetjet, pyetjaTanishme]);
      setPyetjaTanishme("");
    }
  };

  const fshijPyetjen = (index) => {
    const pyetjetReja = pyetjet.filter((_, i) => i !== index);
    setPyetjet(pyetjetReja);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataToSend = {
      pozitaPunes: formData.pozitaPunes,
      kategoriaPunes: formData.kategoriaPunes,
      lokacioniPunes: formData.lokacioniPunes,
      pershkrimiPunes: formData.pershkrimiPunes,
      pyetjet: pyetjet,
      niveliPunes: formData.niveliPunes,
      llojiPunesimit: formData.llojiPunesimit,
    };

    const response = await axios.post(
      "http://localhost:3000/api/shpallja/kompania",
      dataToSend,
    );

    if (response.data.success) {
      alert("Puna u shpall");

      setFormData({
        pozitaPunes: "",
        kategoriaPunes: "",
        lokacioniPunes: "",
        pershkrimiPunes: "",
        niveliPunes: "",
        llojiPunesimit: "",
      });
      setPyetjet([]);
      setPyetjaTanishme("");
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen grid place-items-center py-8 px-4 space-y-10 bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <Link to="/" className="underline text-blue-600">
        Ballina
      </Link>
      <div className="grid rounded-3xl shadow-lg w-full max-w-xl py-10 sm:max-w-2xl md:max-w-4xl bg-linear-to-r from-blue-600 to-indigo-600">
        <h1 className="text-white text-3xl md:text-4xl px-10">
          Publiko Punë të Re
        </h1>
        <p className="text-xl px-10 text-blue-100 py-3">
          Plotësoni formularin për të publikuar shpalljen tuaj
        </p>
      </div>

      <div className="grid rounded-3xl shadow-2xl w-full max-w-xl py-10 sm:max-w-2xl md:max-w-4xl ">
        <h1 className="text-xl md:text-2xl px-10">Informacione Bazike</h1>
        <form onSubmit={handleSubmit} className="grid gap-4 p-10">
          <label htmlFor="pozitaPunes"> </label>
          <input
            className="border border-gray-400 block rounded-xl p-3 "
            type="text"
            id="pozitaPunes"
            placeholder="Pozita e Punës"
            onChange={(e) =>
              setFormData({ ...formData, pozitaPunes: e.target.value })
            }
          />
          <label htmlFor="kategoriaPunes"> </label>
          <select
            id="kategoriaPunes"
            className="border border-gray-400 block rounded-xl p-3 "
            value={formData.kategoriaPunes}
            onChange={(e) =>
              setFormData({ ...formData, kategoriaPunes: e.target.value })
            }
          >
            <option value="" disabled>
              Kategoria
            </option>
            <option value="administrate">Administrate</option>
            <option value="it">IT</option>
          </select>
          <label htmlFor="lokacioniPunes"> </label>
          <input
            className="border border-gray-400 block rounded-xl p-3 "
            type="text"
            id="lokacioniPunes"
            placeholder="Lokacioni i Punës"
            onChange={(e) =>
              setFormData({ ...formData, lokacioniPunes: e.target.value })
            }
          />
          <label htmlFor="niveliPunes"></label>
          <select
            id="niveliPunes"
            className="border border-gray-400 block rounded-xl p-3 "
            value={formData.niveliPunes}
            onChange={(e) =>
              setFormData({ ...formData, niveliPunes: e.target.value })
            }
          >
            <option value="" disabled>
              Zgjedh Nivelin
            </option>
            <option value="praktike">Praktikë</option>
            <option value="fillestar">Fillestar</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="lider">Lider</option>
            <option value="menaxher">Menaxher</option>
            <option value="drejtor">Drejtor</option>
          </select>
          <label htmlFor="llojiPunesimit"></label>
          <select
            id="llojiPunesimit"
            className="border border-gray-400 block rounded-xl p-3 "
            value={formData.llojiPunesimit}
            onChange={(e) =>
              setFormData({ ...formData, llojiPunesimit: e.target.value })
            }
          >
            <option value="" disabled>
              Zgjedh Llojin
            </option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="contract">Kontratë</option>
            <option value="temporary">E Përkohshme</option>
            <option value="internship">Praktikë</option>
          </select>
          <label htmlFor="pershkrimiPunes"></label>
          <textarea
            id="pershkrimiPunes"
            rows="5"
            cols="40"
            className="border border-gray-400 block rounded-xl p-3 "
            placeholder="Pershkrimi Punes"
            onChange={(e) =>
              setFormData({ ...formData, pershkrimiPunes: e.target.value })
            }
          ></textarea>
          <hr className="border-gray-200 my-5" />
          {pyetjet.length > 0 && (
            <>
              <h1 className="text-xl md:text-2xl">Pyetje për Aplikantët</h1>
              <div className="bg-linear-to-br from-gray-50 to-blue-50 grid rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                {pyetjet.map((pyetja, i) => {
                  return (
                    <div
                      key={i}
                      className="p-4 sm:p-5 rounded-xl flex justify-between items-center"
                    >
                      <span>{pyetja}</span>
                      <button
                        type="button"
                        className="cursor-pointer rounded-2xl text-red-400 hover:text-red-600 p-2"
                        onClick={() => fshijPyetjen(i)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <div className="border rounded-2xl border-blue-100 bg-linear-to-br from-gray-50 to-blue-50 flex justify-between gap-5 py-10 px-2">
            <label htmlFor="pyetja"></label>
            <input
              type="text"
              placeholder="Sheno pyetjen"
              className="border border-gray-400 block rounded-xl p-1 w-full"
              value={pyetjaTanishme}
              onChange={(e) => setPyetjaTanishme(e.target.value)}
            />
            <button
              type="button"
              className="cursor-pointer  publikoPune !bg-green-400 w-fit py-2"
              onClick={() => shtoPyetjen()}
            >
              Shto
            </button>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="publikoPune w-fit">
              Publiko
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublikoPune;
4;
