import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import AplikantiCard from "./AplikantiCard";
import "../index.css";
import Kerkimi from "./Kerkimi";
import { useSearchParams } from "react-router-dom";

function ListaAplikanteve() {
  const [aplikantet, setAplikantet] = useState([]);
  const [aplikantetPaKerkim, setAplikantetPaKerkim] = useState([]);
  const [aplikimet, setAplikimet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [kerkoParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/aplikantet/",
        );
        if (response.data.success) {
          setAplikantetPaKerkim(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setAplikantetPaKerkim([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [kerkoParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(kerkoParams);

        if (params.toString()) {
          const response = await axios.get(
            `http://localhost:3000/api/kerkoAplikantin?${params.toString()}`,
          );
          if (response.data.success) {
            setAplikantet(response.data.data || []);
          } else {
            console.error("Gabim ne kerkim:  ", response.data.error);
          }
        } else {
          const response = await axios.get(
            "http://localhost:3000/api/aplikantet/",
          );
          if (response.data.success) {
            setAplikantet(response.data.data || []);
          }
        }
      } catch (err) {
        console.error(err);
        setAplikantet([]);
      }
    };

    fetchData();
  }, [kerkoParams]);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/aplikimet",
        );
        if (response.data.success) {
          setAplikimet(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setAplikimet([]);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(aplikantet.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = aplikantet.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FBFC] via-[#E3F2FD] to-[#B9D7EA]">
      <div className="pb-24 shadow-[#0F4C75]">
        <Header />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-25">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Aplikantët
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Zbulo kandidatët më të mirë që kërkojnë mundësi pune në platformën
            tonë
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {aplikantetPaKerkim.length}+
              </p>
              <p className="text-gray-600 text-sm">Aplikantë të Regjistruar</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {aplikimet.length}+
              </p>
              <p className="text-gray-600 text-sm">Aplikime Aktive</p>
            </div>
          </div>
          <div className="mt-20">
            <Kerkimi />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems.map((a) => (
            <div
              key={a._id}
              className="
                bg-white rounded-3xl
                shadow-lg hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-300
                border border-gray-100
                overflow-hidden
              "
            >
              <AplikantiCard aplikanti={a} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`
                w-9 h-9 rounded-full border transition
                ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
                }
              `}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-9 h-9 rounded-full font-medium transition
                  ${
                    currentPage === page
                      ? "bg-primary text-white shadow-md scale-110"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`
                w-9 h-9 rounded-full border transition
                ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
                }
              `}
            >
              ›
            </button>
          </div>
        )}

        {aplikantet.length === 0 && (
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto shadow-lg">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Asnjë aplikant i regjistruar ende
              </p>
              <p className="text-gray-500">
                Kthehu më vonë për të parë aplikantët e rinj
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaAplikanteve;
