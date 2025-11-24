import { useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";

function Regjistrimi() {
  const navigate = useNavigate();
  const [tipiPerdoruesit, setTipiPerdoruesit] = useState("");

  const [dataAplikant, setDataAplikant] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    fjalekalimi: "",
    konfirmoFjalekalimin: "",
  });

  const [dataPunedhenesi, setDataPunedhenesi] = useState({
    kompania: "",
    email: "",
    fjalekalimi: "",
    konfirmoFjalekalimin: "",
  });

  const validateForm = (e) => {
    e.preventDefault();
    if (tipiPerdoruesit === "aplikant") {
      if (!dataAplikant.emri) {
        alert("sheno emrin");
        return;
      }
      if (!dataAplikant.mbiemri) {
        alert("sheno mbiemrin");
        return;
      }
      if (!dataAplikant.email) {
        alert("sheno emailin");
        return;
      }
      if (!dataAplikant.fjalekalimi) {
        alert("sheno fjalekalimin");
        return;
      }
      if (!dataAplikant.konfirmoFjalekalimin) {
        alert("sheno fjalekalimin");
        return;
      }
    } else if (tipiPerdoruesit === "punedhenes") {
      if (!dataPunedhenesi.kompania) {
        alert("sheno kompanine");
        return;
      }
      if (!dataPunedhenesi.email) {
        alert("sheno emailin");
        return;
      }
      if (!dataPunedhenesi.fjalekalimi) {
        alert("sheno fjalekalimin");
        return;
      }
      if (!dataPunedhenesi.konfirmoFjalekalimin) {
        alert("sheno fjalekalimin persdyti");
        return;
      }
    } else {
      alert("selekto tipin");
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        class="flex justify-center items-center w-full sm:w-[500px] md:w-[600px] lg:w-[650px]
                      transition-all duration-300 ease-in-out
                      bg-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-10"
      >
        <div>
          <h1 className="font-bold text-4xl flex justify-center items-center mb-2 sm:mb-6 md:mb-9">
            Regjistrimi
          </h1>
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 text-xl">
            <label
              htmlFor="aplikant"
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            >
              <span className="text-sm sm:text-xl ">Aplikant</span>
              <input
                type="radio"
                name="tipiPerdoruesit"
                value="aplikant"
                className="border w-4 h-4 cursor-pointer"
                required
                onChange={(e) => setTipiPerdoruesit(e.target.value)}
              />
            </label>
            <label
              htmlFor="punedhenes"
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            >
              <span className="text-sm sm:text-xl ">Punedhenes</span>
              <input
                type="radio"
                name="tipiPerdoruesit"
                value="punedhenes"
                className="border w-4 h-4 cursor-pointer"
                required
                onChange={(e) => setTipiPerdoruesit(e.target.value)}
              />
            </label>
          </div>
          <div
            className={
              tipiPerdoruesit === "aplikant" || tipiPerdoruesit === ""
                ? "block"
                : "hidden"
            }
          >
            <form onSubmit={validateForm} className="space-y-3">
              <div>
                <label htmlFor="emri">Emri</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataAplikant({ ...dataAplikant, emri: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="mbiemri">Mbiemri</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataAplikant({
                      ...dataAplikant,
                      mbiemri: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataAplikant({ ...dataAplikant, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="fjalekalimi">Fjalekalimi</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataAplikant({
                      ...dataAplikant,
                      fjalekalimi: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="konfirmoFjalekalimin">
                  Konfirmo Fjalekalimin
                </label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataAplikant({
                      ...dataAplikant,
                      konfirmoFjalekalimin: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10 hover:bg-blue-400 hover:text-white cursor-pointer"
              >
                Regjistrohu
              </button>
            </form>
          </div>

          <div
            className={tipiPerdoruesit === "punedhenes" ? "block" : "hidden"}
          >
            <form onSubmit={validateForm} className="space-y-3">
              <div>
                <label htmlFor="kompania">Kompania</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  placeholder="Kompania"
                  onChange={(e) =>
                    setDataPunedhenesi({
                      ...dataPunedhenesi,
                      kompania: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  placeholder="Email"
                  onChange={(e) =>
                    setDataPunedhenesi({
                      ...dataPunedhenesi,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="fjalekalimi">Fjalekalimi</label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataPunedhenesi({
                      ...dataPunedhenesi,
                      fjalekalimi: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="konfirmoFjalekalimin">
                  Konfirmo Fjalekalimin
                </label>
                <input
                  type="text"
                  className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setDataPunedhenesi({
                      ...dataPunedhenesi,
                      konfirmoFjalekalimin: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="border block rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
              >
                Regjistrohu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regjistrimi;
