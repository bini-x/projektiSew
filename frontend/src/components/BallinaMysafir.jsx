import Header from "./Header";
import Kerkimi from "./Kerkimi";
import ShpalljaCard from "./ShpalljaCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Perdoruesi from "../PerdoruesiContext";
import {
  Search,
  UserPen,
  TrendingUp,
  BookPlus,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

function BallinaMysafir() {
  const navigate = useNavigate();
  const [shpalljaData, setShpalljaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/kompania",
        );
        setShpalljaData(response.data.data || []);
      } catch (err) {
        console.error(err);
        setShpalljaData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semi-bold leading-tight mt-20">
        Gjeni punen perfekte per ju
      </h1>

      <Kerkimi />
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[repeat(2,630px)] justify-center gap-6 mt-20 m-10 md:m-15 lg:15 xl:m-20">
        <div className="border-gray-300 shadow-xl p-10">
          <h1 className="text-2xl font-semibold ">Po punësoni talentë?</h1>
          <p className="mb-5 mt-1 text-gray-900 font-extralight">
            Lidhu me kandidatë të kualifikuar dhe ndërto ekipin tënd. Publiko
            vende pune brenda pak minutash.
          </p>
          <h2 className="flex gap-2 items-center text-l mb-2">
            <BookPlus size={20} />
            Publiko Punë
          </h2>
          <h2 className="flex gap-2 items-c10enter text-l mb-2">
            <Users size={20} />
            Rishikoni aplikantët
          </h2>

          <h2 className="flex gap-2 items-center text-l mb-2">
            <BriefcaseBusiness size={20} />
            Menaxho Shpalljet
          </h2>
          <button
            type="button"
            className="publikoPune w-full"
            onClick={() => navigate("/kycja")}
          >
            Kycu
          </button>
        </div>
        <div className="border-gray-300 p-10 shadow-xl">
          <h1 className="text-2xl font-semibold m-auto">Po kërkoni punë?</h1>
          <p className="mb-5 mt-1 text-gray-900 font-extralight">
            Gjeni mundësi të arta nga kompanit më të mira. Gjej punën e ëndrrave
            sot.
          </p>
          <h2 className="flex gap-2 items-center text-l mb-2">
            <Search size={20} /> Kërko Punë <br />
          </h2>
          <h2 className="flex gap-2 items-center text-l mb-2">
            <UserPen size={20} />
            Ndërto Profilin
          </h2>
          <h2 className="flex gap-2 items-center text-l mb-2">
            <TrendingUp size={20} />
            Menaxho Aplikimet
          </h2>
          <button
            type="button"
            className="publikoPune w-full"
            onClick={() => navigate("/kycja")}
          >
            Kycu
          </button>
        </div>
      </div>

      <div className="m-10 md:m-15 lg:m-20">
        <h2 className="text-xl sm:text-xl md:text-2xl font-semibold mb-5 px-2">
          Punë të disponueshme
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {shpalljaData.slice(0, 9).map((shpallja) => {
            return <ShpalljaCard key={shpallja._id} shpallja={shpallja} />;
          })}
        </div>

        {shpalljaData.length === 0 && (
          <div className="text-center p-10">
            <p>Nuk ka punë të disponueshme</p>
          </div>
        )}

        {shpalljaData.length > 9 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              className="publikoPune px-8 py-3"
              onClick={() => navigate("/ListaPuneve")}
            >
              Shfaq më shumë
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BallinaMysafir;
