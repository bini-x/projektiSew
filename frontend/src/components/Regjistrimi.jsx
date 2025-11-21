import { useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";

function Regjistrimi() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    emri: "",
    mbiemri: "",
    kompania: "",
    email: "",
    fjalekalimi: "",
    konfirmoFjalekalimin: "",
    tipiPerdoruesit: "",
  });

  const validateForm = (e) => {
    e.preventDefault();
    if (data.tipiPerdoruesit === "aplikant") {
      if (!data.emri) {
        alert("sheno emrin");
        return;
      }
      if (!data.mbiemri) {
        alert("sheno mbiemrin");
        return;
      }
    } else if (data.tipiPerdoruesit === "punedhenes") {
      if (!data.kompania) {
        alert("sheno kompanine");
        return;
      }
    }
    if (!data.fjalekalimi) {
      alert("sheno fjalekalimin");
      return;
    }
    if (!data.konfirmoFjalekalimin) {
      alert("konfirmo fjalekalimin");
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h1 className="font-bold text-2xl">Regjistrimi</h1>
        <form onSubmit={validateForm}>
          <div>
            <label htmlFor="aplikant">Aplikant</label>
            <input
              type="radio"
              name="tipiPerdoruesit"
              value="aplikant"
              className="border"
              required
              onChange={(e) =>
                setData({ ...data, tipiPerdoruesit: e.target.value })
              }
            />
            <label htmlFor="punedhenes">Punedhenes</label>
            <input
              type="radio"
              name="tipiPerdoruesit"
              value="punedhenes"
              className="border"
              required
              onChange={(e) =>
                setData({ ...data, tipiPerdoruesit: e.target.value })
              }
            />
          </div>
          <div
            className={
              data.tipiPerdoruesit === "punedhenes" ? "hidden" : "block"
            }
          >
            <label htmlFor="emri">Emri</label>
            <input
              type="text"
              className="border"
              value={data.emri}
              onChange={(e) => setData({ ...data, emri: e.target.value })}
            />
          </div>
          <div
            className={
              data.tipiPerdoruesit === "punedhenes" ? "hidden" : "block"
            }
          >
            <label htmlFor="mbiemri">Mbiemri</label>
            <input
              type="text"
              className="border"
              onChange={(e) => setData({ ...data, mbiemri: e.target.value })}
            />
          </div>
          <div
            className={
              data.tipiPerdoruesit === "punedhenes" ? "block" : "hidden"
            }
          >
            <label htmlFor="kompania">Kompania</label>
            <input
              type="text"
              className="border"
              value={data.kompania}
              onChange={(e) => setData({ ...data, kompania: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="border"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="fjalekalimi">Fjalekalimi</label>
            <input
              type="text"
              className="border"
              onChange={(e) =>
                setData({ ...data, fjalekalimi: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="konfirmoFjalekalimin">Konfirmo Fjalekalimin</label>
            <input
              type="text"
              className="border"
              onChange={(e) =>
                setData({ ...data, konfirmoFjalekalimin: e.target.value })
              }
            />
          </div>
          <button type="submit" className="border ">
            Regjistrohu
          </button>
        </form>
      </div>
    </div>
  );
}

export default Regjistrimi;
