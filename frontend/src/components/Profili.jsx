import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Mail, Phone } from "lucide-react";

function Profili() {
  const navigate = useNavigate();
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

  const handleCkycja = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ckycja/perdoruesi",
        {},
        { withCredentials: true },
      );
      setPerdoruesiData(null);
      console.log("Ckycja u be", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setPerdoruesiData(null);
    }
  };

  const getInitials = () => {
    if (perdoruesiData?.emri && perdoruesiData?.mbiemri) {
      return `${perdoruesiData.emri[0]}${perdoruesiData.mbiemri[0]}`.toUpperCase();
    } else if (perdoruesiData?.kompania) {
      return perdoruesiData.kompania.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header perdoruesiData={perdoruesiData} onCkycja={handleCkycja} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32 bg-white/30 "></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-black text-4xl font-bold shadow-xl border-4 border-blue-100">
                {getInitials()}
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {perdoruesiData?.emri || perdoruesiData?.kompania}{" "}
                  {perdoruesiData?.mbiemri}
                </h1>

                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mt-4">
                  <Mail size={16} />
                  {perdoruesiData.email}
                </p>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                  <Phone size={16} />
                  {perdoruesiData.nrTelefonit}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Pervoja e Punes
            </h1>
            <button className="publikoPune">Shto</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profili;
