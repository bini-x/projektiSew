import "../App.css";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Kerkimi() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    kerko: "",
    lokacioniPunes: "",
    kategoriaPunes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (filters.kerko.trim()) {
      params.append("kerko", filters.kerko.trim());
    }

    if (filters.lokacioniPunes.trim()) {
      params.append("lokacioniPunes", filters.lokacioniPunes.trim());
    }

    if (filters.kategoriaPunes.trim()) {
      params.append("kategoriaPunes", filters.kategoriaPunes.trim());
    }

    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center border border-gray-200 mx-auto my-8 rounded-lg shadow-xl w-fit">
      <div className="flex justify-center items-center bg-white my-2">
        <form onSubmit={handleSubmit}>
          <div className="inline ">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="flex justify-center items-center mx-4"
            />
            <input
              type="text"
              placeholder="Kerko"
              className=" w-auto"
              value={filters.kerko}
              onChange={(e) =>
                setFilters({ ...filters, kerko: e.target.value })
              }
            />
          </div>

          <div className="inline ">
            <FontAwesomeIcon icon={faLocationDot} />
            <select
              name="lokacioniPunes"
              className="bg-transparent border-0 cursor-pointer focus:outline-none"
              value={filters.lokacioniPunes}
              onChange={(e) =>
                setFilters({ ...filters, lokacioniPunes: e.target.value })
              }
            >
              <option value="" hidden>
                Qyteti
              </option>
              <option value="Koretin">Koretin</option>
              <option value="Kamenica">Kamenica</option>
            </select>
          </div>

          <div className="inline">
            <FontAwesomeIcon icon={faBriefcase} />
            <select
              name="kategoriaPunes"
              className="bg-transparent border-0 cursor-pointer focus:outline-none"
              value={filters.kategoriaPunes}
              onChange={(e) =>
                setFilters({ ...filters, kategoriaPunes: e.target.value })
              }
            >
              <option value="" hidden>
                Kategoria
              </option>
              <option value="it">IT</option>
              <option value="administrate">Administrate</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-30 h-10 mx-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Kerko
          </button>
        </form>
      </div>
    </div>
  );
}

export default Kerkimi;
