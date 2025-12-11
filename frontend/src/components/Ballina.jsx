import Header from "./Header";
import Kerkimi from "./Kerkimi";
import "../index.css";
import ShpalljaCard from "./ShpalljaCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Ballina() {
  const [shpalljaData, setShpalljaData] = useState([]);
  const [kerkoParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(kerkoParams);

        if (params.toString()) {
          const response = await axios.get(
            `http://localhost:3000/api/shpallja/kerko?${params.toString()}`,
          );
          if (response.data.success) {
            setShpalljaData(response.data.data || []);
          } else {
            console.error("Gabim ne kerkim: ", response.data.error);
          }
        } else {
          const response = await axios.get(
            "http://localhost:3000/api/shpallja/kompania",
          );
          setShpalljaData(response.data.data || []);
        }
      } catch (err) {
        console.error(err);
        setShpalljaData([]);
      }
    };

    fetchData();
  }, [kerkoParams]);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center text-5xl my-15">
        <h1 className="">Gjeni punen perfekte per ju</h1>
      </div>

      <Kerkimi />
      <div className="grid grid-cols-3 place-items-center">
        {shpalljaData.map((shpallja) => {
          return <ShpalljaCard key={shpallja._id} shpallja={shpallja} />;
        })}
        {shpalljaData.length === 0 && (
          <div className="text-center p-10">
            <p>
              {kerkoParams.toString()
                ? "Nuk u gjet asnjë punë me këto kërkime"
                : "Nuk ka punë të disponueshme"}
            </p>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default Ballina;
