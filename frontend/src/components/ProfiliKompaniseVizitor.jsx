import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaBuilding,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import Perdoruesi from "../PerdoruesiContext";

const ProfiliKompaniseVizitor = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fotoProfile, setFotoProfile] = useState(null);

  const { perdoruesiData: currentUser } = Perdoruesi.usePerdoruesi();

  const formatDateDDMMYYYY = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "";
    }
  };

  // Get initials for profile picture
  const merreShkronjatFillestare = () => {
    if (profileData?.emri && profileData?.mbiemri) {
      return `${profileData.emri[0]}${profileData.mbiemri[0]}`.toUpperCase();
    } else if (profileData?.kompania) {
      return profileData.kompania.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Fetch user profile data
        const response = await axios.get(
          `http://localhost:3000/api/profili/${id}`,
        );

        const userData = response.data.data;
        setProfileData(userData);

        // Load profile photo if exists
        if (userData.foto) {
          setFotoProfile(`http://localhost:3000/api/profili/${id}/foto`);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gabim në ngarkimin e të dhënave të profilit");
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Duke ngarkuar profilin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error || "Diqka shkoi keq. Profili nuk u gjet."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Header/Profile Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 mt-10">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-black text-3xl font-bold overflow-hidden">
                      {fotoProfile ? (
                        <img
                          src={fotoProfile}
                          alt="Foto Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{merreShkronjatFillestare()}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {profileData?.kompania || "Kompania"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - ONE DIV that contains all three sections */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
                {/* Rreth Nesh Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                    Rreth Nesh
                  </h3>
                  {profileData?.rrethKompanise ? (
                    <p className="text-gray-700 leading-relaxed">
                      {profileData.rrethKompanise}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Nuk ka informacione të shtuar akoma.
                    </p>
                  )}
                </div>

                {/* Pune te Hapura Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
                    <FaBriefcase className="text-blue-500" />
                    Punë të Hapura
                  </h3>
                  <p className="text-gray-500 text-center py-8">
                    Nuk ka pozicione të hapura aktualisht
                  </p>
                </div>

                {/* Permbledhje Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                    Përmbledhje
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {profileData?.kategorite && (
                      <div className="flex items-start gap-3">
                        <FaBriefcase className="text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Kategoritë</p>
                          <p className="text-gray-700 font-medium">
                            {profileData.kategorite}
                          </p>
                        </div>
                      </div>
                    )}

                    {profileData?.dataThemelimit && (
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Data e themelimit</p>
                          <p className="text-gray-700 font-medium">
                            {formatDateDDMMYYYY(profileData.dataThemelimit)}
                          </p>
                        </div>
                      </div>
                    )}

                    {profileData?.vendodhja && (
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Vendodhja</p>
                          <p className="text-gray-700 font-medium">
                            {profileData.vendodhja}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Informacione të Kompanisë (standalone) */}
            <div className="lg:col-span-1">
              {profileData?.tipiPerdoruesit === "punedhenes" && profileData?.kompania && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                    Informacione të Kompanisë
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Emri i Kompanisë
                        </p>
                        <p className="text-gray-700 font-medium">
                          {profileData.kompania}
                        </p>
                      </div>
                    </div>
                    
                    {profileData?.email && (
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-700 font-medium">
                            {profileData.email}
                          </p>
                        </div>
                      </div>
                    )}

                    {profileData?.nrTelefonit && (
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Telefon</p>
                          <p className="text-gray-700 font-medium">
                            {profileData.nrTelefonit}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Anëtar që nga</p>
                        <p className="text-gray-700 font-medium">
                          {profileData?.createdAt
                            ? formatDateDDMMYYYY(profileData.createdAt)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Linqet Sociale - mbetet në kolonën e djathtë */}
              {profileData?.linqet && profileData.linqet.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                    Linqet Sociale
                  </h3>
                  <div className="space-y-3">
                    {profileData.linqet.map((link, index) => (
                      <a
                        key={index}
                        href={link.linku}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {link.platforma}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {link.linku}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfiliKompaniseVizitor;