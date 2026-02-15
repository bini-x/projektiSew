import "../App.css";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const EMPTY_FILTERS = {
  kerko: "",
  lokacioniPunes: "",
  kategoriaPunes: "",
  kompania: "",
};

// Human-readable labels for each filter chip
const FILTER_LABELS = {
  kerko: (v) => `"${v}"`,
  lokacioniPunes: (v) => v,
  kategoriaPunes: (v) => v,
  kompania: (v) => v,
};

function Kerkimi({
  showLocation = true,
  showCategory = true,
  compact = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filters, setFilters] = useState({
    kerko: "",
    lokacioniPunes: "",
    kategoriaPunes: "",
  });

  // Ref so updateURL always reads the latest filters without stale closures
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const updateURL = (currentFilters) => {
    const f = currentFilters ?? filtersRef.current;
    const params = new URLSearchParams();
    if (f.kerko.trim()) params.append("kerko", f.kerko.trim());
    if (f.lokacioniPunes.trim())
      params.append("lokacioniPunes", f.lokacioniPunes.trim());
    if (f.kategoriaPunes.trim())
      params.append("kategoriaPunes", f.kategoriaPunes.trim());
    if (f.kompania.trim()) params.append("kompania", f.kompania.trim());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Debounce only the text input
  useEffect(() => {
    const timeout = setTimeout(() => updateURL(), 300);
    return () => clearTimeout(timeout);
  }, [filters.kerko]);

  // Dropdowns fire instantly
  useEffect(() => {
    updateURL();
  }, [filters.lokacioniPunes, filters.kategoriaPunes, filters.kompania]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateURL();
  };

  const clearFilter = (key) => {
    const updated = { ...filters, [key]: "" };
    setFilters(updated);
    updateURL(updated);
  };

  const clearAll = () => {
    setFilters(EMPTY_FILTERS);
    updateURL(EMPTY_FILTERS);
  };

  const activeFilters = Object.entries(filters).filter(([, v]) => v.trim());

  return (
    <div
      className={`w-full mx-auto px-4 my-8 ${compact ? "max-w-xl" : "max-w-6xl"}`}
    >
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit}>
          <div
            className={
              compact ? "flex items-center gap-2 px-4 py-3" : "responsiveKerko"
            }
          >
            {/* Text search */}
            <div
              className={compact ? "flex items-center gap-2 flex-1" : "kerko"}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={compact ? "text-gray-400 text-sm" : "text-gray-400"}
              />
              <input
                type="text"
                placeholder="Kerko"
                className={`w-full bg-transparent focus:outline-none ${compact ? "text-sm" : ""}`}
                value={filters.kerko}
                onChange={(e) =>
                  setFilters({ ...filters, kerko: e.target.value })
                }
              />
              {filters.kerko && (
                <button
                  type="button"
                  onClick={() => clearFilter("kerko")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={compact ? "text-xs" : ""}
                  />
                </button>
              )}
            </div>

            {/* City dropdown */}
            {showLocation && (
              <div className="kerko">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-gray-400"
                />
                <select
                  name="lokacioniPunes"
                  className="w-full bg-transparent cursor-pointer focus:outline-none"
                  value={filters.lokacioniPunes}
                  onChange={(e) =>
                    setFilters({ ...filters, lokacioniPunes: e.target.value })
                  }
                >
                  <option value="" hidden>
                    Qyteti
                  </option>
                  <option value="Prishtine">Prishtinë</option>
                  <option value="Prizren">Prizren</option>
                  <option value="Peje">Pejë</option>
                  <option value="Gjakove">Gjakovë</option>
                  <option value="Mitrovice">Mitrovicë</option>
                  <option value="Ferizaj">Ferizaj</option>
                  <option value="Gjilan">Gjilan</option>
                  <option value="Vushtrri">Vushtrri</option>
                  <option value="Podujeve">Podujevë</option>
                  <option value="Suhareke">Suharekë</option>
                  <option value="Rahovec">Rahovec</option>
                  <option value="Drenas">Drenas</option>
                  <option value="Lipjan">Lipjan</option>
                  <option value="Malisheve">Malishevë</option>
                  <option value="Kamenice">Kamenicë</option>
                  <option value="Viti">Viti</option>
                  <option value="Skenderaj">Skenderaj</option>
                  <option value="Istog">Istog</option>
                  <option value="Kline">Klinë</option>
                  <option value="Decan">Deçan</option>
                  <option value="Junik">Junik</option>
                  <option value="Dragash">Dragash</option>
                  <option value="Kaçanik">Kaçanik</option>
                  <option value="Hani_i_Elezit">Hani i Elezit</option>
                  <option value="Shtime">Shtime</option>
                  <option value="Obiliq">Obiliq</option>
                  <option value="Fushe_Kosove">Fushë Kosovë</option>
                  <option value="Kllokot">Kllokot</option>
                </select>
                {filters.lokacioniPunes && (
                  <button
                    type="button"
                    onClick={() => clearFilter("lokacioniPunes")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
            )}

            {/* Category dropdown */}
            {showCategory && (
              <div className="kerko">
                <FontAwesomeIcon icon={faBriefcase} className="text-gray-400" />
                <select
                  name="kategoriaPunes"
                  className="w-full bg-transparent cursor-pointer focus:outline-none"
                  value={filters.kategoriaPunes}
                  onChange={(e) =>
                    setFilters({ ...filters, kategoriaPunes: e.target.value })
                  }
                >
                  <option value="" hidden>
                    Kategoria
                  </option>
                  <option value="industria">Industria</option>
                  <option value="administrate">Administratë</option>
                  <option value="agrikulture-industri-ushqimore">
                    Agrikulturë dhe Industri Ushqimore
                  </option>
                  <option value="arkitekture">Arkitekturë</option>
                  <option value="banka">Banka</option>
                  <option value="retail-distribuim">
                    Retail dhe Distribuim
                  </option>
                  <option value="ndertimtari-patundshmeri">
                    Ndërtimtari & Patundshmëri
                  </option>
                  <option value="mbeshtetje-konsumatoreve-call-center">
                    Mbështetje e Konsumatorëve, Call Center
                  </option>
                  <option value="ekonomi-finance-kontabilitet">
                    Ekonomi, Financë, Kontabilitet
                  </option>
                  <option value="edukim-shkence-hulumtim">
                    Edukim, Shkencë & Hulumtim
                  </option>
                  <option value="pune-te-pergjithshme">
                    Punë të Përgjithshme
                  </option>
                  <option value="burime-njerezore">Burime Njerëzore</option>
                  <option value="teknologji-informacioni">
                    Teknologji e Informacionit
                  </option>
                  <option value="sigurim">Sigurim</option>
                  <option value="gazetari-shtyp-media">
                    Gazetari, Shtyp & Media
                  </option>
                  <option value="ligj-legjislacion">Ligj & Legjislacion</option>
                  <option value="menaxhment">Menaxhment</option>
                  <option value="marketing-reklamim-pr">
                    Marketing, Reklamim & PR
                  </option>
                  <option value="inxhinieri">Inxhinieri</option>
                  <option value="shendetesi-medicine">
                    Shëndetësi, Medicinë
                  </option>
                  <option value="Prodhim">Prodhim</option>
                  <option value="Siguri$Mbrojtje">Siguri&Mbrojtje</option>
                  <option value="Industri te sherbimit">
                    Industri te sherbimit
                  </option>
                  <option value="Telekomunikim">Telekomunikim</option>
                  <option value="Tekstil, Lekure, Industri Veshembathje">
                    Tekstil, Lekure, Industri Veshembathje
                  </option>
                  <option value="Gastronomi, Hoteleri, Turizem">
                    Gastronomi, Hoteleri, Turizem
                  </option>
                  <option value="Transport, Logjistike">
                    Transport, Logjistike
                  </option>
                  <option value="IT">IT</option>
                </select>
                {filters.kategoriaPunes && (
                  <button
                    type="button"
                    onClick={() => clearFilter("kategoriaPunes")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-6 pb-4">
            {activeFilters.map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full border border-indigo-200"
              >
                {FILTER_LABELS[key]?.(value) ?? value}
                <button
                  type="button"
                  onClick={() => clearFilter(key)}
                  className="hover:text-indigo-900 transition-colors"
                  aria-label={`Remove ${key} filter`}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              </span>
            ))}

            {activeFilters.length > 1 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors underline underline-offset-2"
              >
                Pastro të gjitha
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Kerkimi;
