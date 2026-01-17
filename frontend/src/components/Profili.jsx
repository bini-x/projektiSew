import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Mail, Phone, Briefcase, Plus } from "lucide-react";

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

      <div className="max-w-4xl mx-auto m-10">
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
        </div>
      </div>
      {/* Eksperienca  */}
      <div className="min-h-screen bg-gray-100 ">
        <div className="max-w-4xl mx-auto ">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                Shto
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
              <input
                type="text"
                placeholder="Job Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Period (e.g., 2020 - Present)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Ruaj
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                  Anulo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profili;
