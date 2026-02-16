import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import KompaniaCard from "./KompaniaCard";
import Kerkimi from "./Kerkimi";
import { useSearchParams } from "react-router-dom";

function ListaKompanive() {
  const [shpalljaData, setShpalljaData] = useState([]);
  const [kompanite, setKompanite] = useState([]);
  const [kompanitePaKerkim, setKompanitePaKerkim] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [kerkoParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 6;

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [kerkoParams]);

  // Fetch companies (with or without search)
  useEffect(() => {
    const fetchKompanite = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(kerkoParams);
        let response;

        if (params.toString()) {
          // Search with filters
          response = await axios.get(
            `http://localhost:3000/api/kerkoKompanine?${params.toString()}`,
          );
        } else {
          // Get all companies
          response = await axios.get(
            "http://localhost:3000/api/kompania/kompanite",
          );
        }

        if (response.data.success) {
          setKompanite(response.data.data || []);
        } else {
          setError("Gabim gjatë kërkimit të kompanive");
          setKompanite([]);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError(err.response?.data?.message || "Gabim në lidhjen me serverin");
        setKompanite([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKompanite();
  }, [kerkoParams]);

  // Fetch total companies count for stats (without search)
  useEffect(() => {
    const fetchTotalCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/kompania/kompanite",
        );
        if (response.data.success) {
          setKompanitePaKerkim(response.data.data);
        }
      } catch (err) {
        console.error(err);
        setKompanitePaKerkim([]);
      }
    };

    fetchTotalCompanies();
  }, []);

  // Fetch active jobs count
  useEffect(() => {
    const fetchJobsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/kompania",
        );
        if (response.data.success) {
          const activeJobs = response.data.data.filter(
            (job) => job.status === "aktiv",
          );
          setShpalljaData(activeJobs);
        }
      } catch (err) {
        console.error(err);
        setShpalljaData([]);
      }
    };

    fetchJobsCount();
  }, []);

  const totalPages = Math.ceil(kompanite.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kompanite.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      {/* Gradient Hero Section */}
      <div className="bg-gradient-to-br from-[#F7FBFC] to-[#B9D7EA] pb-16 backdrop-blur-sm">
        <Header withGradient={false} />

        <div className="max-w-6xl mx-auto px-4 mt-20 mb-12">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Kompanitë
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zbulo kompanitë më të mira që ofrojnë mundësi pune në platformën
              tonë
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#0f4c75] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2 text-center">
                {kompanitePaKerkim.length}+
              </p>
              <p className="text-gray-600 text-sm text-center">
                Kompani të Regjistruara
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#6d94c5] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2 text-center">
                {shpalljaData.length}+
              </p>
              <p className="text-gray-600 text-sm text-center">
                Vende Pune Aktive
              </p>
            </div>
          </div>

          {/* Search Component */}
          <div className="mt-20">
            <Kerkimi showLocation={false} showCategory={false} compact={true} />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-3">
            Gjej kompaninë që të përshtatet
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Shfleto kompanitë më të mira dhe zbulo mundësi të reja karriere
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f4c75]"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto mb-8">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm underline hover:no-underline"
            >
              Provo përsëri
            </button>
          </div>
        )}

        {/* Search Results Count */}
        {!isLoading && kerkoParams.toString() && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              U gjetën{" "}
              <span className="font-semibold text-[#0f4c75]">
                {kompanite.length}
              </span>{" "}
              rezultate
            </p>
          </div>
        )}

        {/* Companies Grid */}
        {!isLoading && !error && kompanite.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentItems.map((k) => (
                <KompaniaCard key={k._id} kompania={k} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`
                    px-3 py-1 rounded-full border transition-all duration-200
                    flex items-center gap-1
                    ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }
                  `}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                          w-9 h-9 rounded-full font-medium transition-all duration-200
                          ${
                            currentPage === page
                              ? "bg-primary text-white shadow-md scale-105"
                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          }
                        `}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`
                    px-3 py-1 rounded-full border transition-all duration-200
                    flex items-center gap-1
                    ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }
                  `}
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && kompanite.length === 0 && (
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto shadow-lg">
              <div className="text-6xl mb-4">
                {kerkoParams.toString() ? "🔍" : "🏢"}
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {kerkoParams.toString()
                  ? "Nuk u gjetën rezultate"
                  : "Asnjë kompani e regjistruar ende"}
              </p>
              <p className="text-gray-500 mb-6">
                {kerkoParams.toString()
                  ? "Provo të ndryshosh kriteret e kërkimit"
                  : "Kthehu më vonë për të parë kompanitë e reja"}
              </p>
              {kerkoParams.toString() && (
                <button
                  onClick={() => (window.location.href = "/listaKompanive")}
                  className="px-6 py-2.5 bg-[#0f4c75] text-white rounded-lg hover:bg-[#0a3a5a] transition-colors"
                >
                  Shiko të gjitha kompanitë
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaKompanive;
