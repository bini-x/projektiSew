import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
  FaEdit,
  FaSave,
  FaTimes,
  FaLanguage,
  FaCertificate,
  FaTools,
} from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfiliAplikantit = () => {
  const { id } = useParams();
  const [aplikanti, setAplikanti] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    const fetchAplikanti = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/aplikantet/${id}`,
          { withCredentials: true },
        );
        if (response.data.success) {
          setAplikanti(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gabim në ngarkimin e të dhënave");
        setLoading(false);
      }
    };

    if (id) {
      fetchAplikanti();
    }
  }, [id]);

  // Funksioni për fillimin e editimit
  const handleEdit = () => {
    setTempData(aplikanti);
    setEditing(true);
  };

  const handleSave = () => {
    setAplikanti(tempData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!aplikanti) {
    return <div>diqka shkoi keq</div>;
  }

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

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error}</p>
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
          {/* Header i profilit me butona edit */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 mt-10">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="relative">
                    <img
                      src={
                        editing ? tempData.fotoProfili : aplikanti.fotoProfili
                      }
                      alt="Foto Profili"
                      className="w-24 h-24 rounded-full border-4 border-white"
                    />
                    {editing && (
                      <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                        <FaEdit size={14} />
                      </button>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {editing ? (
                        <input
                          type="text"
                          value={tempData.emri}
                          onChange={(e) => handleChange("emri", e.target.value)}
                          className="bg-transparent border-b border-white text-white"
                        />
                      ) : (
                        aplikanti.emri
                      )}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {editing ? (
                        <input
                          type="text"
                          value={tempData.profesioni}
                          onChange={(e) =>
                            handleChange("profesioni", e.target.value)
                          }
                          className="bg-transparent border-b border-blue-100 text-blue-100"
                        />
                      ) : (
                        aplikanti.profesioni
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informacioni kryesor */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolona e majtë - Informacione personale dhe kontakt */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio dhe përshkrim */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Rreth Meje
                </h3>
                {editing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="w-full h-40 p-3 border rounded-lg"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {aplikanti.bio}
                  </p>
                )}
              </div>

              {/* Edukimi */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
                  <FaGraduationCap /> Edukimi
                </h3>
              </div>

              {/* Përvoja profesionale */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
                  <FaBriefcase /> Përvoja Profesionale
                </h3>
              </div>

              {/* Aftësitë - Këtu përdoret komponenti i ri */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Aftësitë
                </h3>
              </div>
            </div>

            {/* Kolona e djathtë - Informacione shtesë */}
            <div className="space-y-6">
              {/* Informacione kontaktuese */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Informacione Kontaktuese
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">{aplikanti.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaPhone className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="text-gray-700">{aplikanti.telefon}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Data e Lindjes</p>
                      <p className="text-gray-700">{aplikanti.dataLindjes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Vendodhja</p>
                      <p className="text-gray-700">{aplikanti.vendodhja}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferencat e punës */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Preferencat e Punës
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Pozitat e preferuara
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat?.pozitat?.map((pozita, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {pozita}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Industria e preferuar
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat?.industria.map(
                        (industri, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                          >
                            {industri}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Lokacioni i preferuar
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat?.lokacioni.map(
                        (lokacion, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                          >
                            {lokacion}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Paga minimale e pritur
                    </p>
                    <p className="text-gray-700 font-medium">
                      {aplikanti.preferencat?.pagaMin}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifikimet */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Certifikimet
                </h3>
                <div className="space-y-3">
                  {aplikanti.certifikimet?.map((certifikimi) => (
                    <div
                      key={certifikimi.id}
                      className="border-l-4 border-blue-500 pl-3"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {certifikimi.emri}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {certifikimi.institucioni}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {certifikimi.data}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projekte */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                  Projektet
                </h3>
                <div className="space-y-3">
                  {aplikanti.projektet?.map((projekti) => (
                    <div
                      key={projekti.id}
                      className="p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {projekti.emri}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {projekti.pershkrimi}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {projekti.teknologjite.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={projekti.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Shiko projektin →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CV dhe dokumente */}
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
                Dokumentet
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-blue-600 text-3xl mb-2">📄</div>
                  <h4 className="font-semibold text-gray-800">CV</h4>
                  <p className="text-gray-600 text-sm">
                    Ngarko CV_Punesohu.pdf
                  </p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Shkarko
                  </button>
                </div>

                <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-green-600 text-3xl mb-2">📃</div>
                  <h4 className="font-semibold text-gray-800">
                    Letër Rekomandimi
                  </h4>
                  <p className="text-gray-600 text-sm">Punesohu.pdf</p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Shkarko
                  </button>
                </div>

                <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-purple-600 text-3xl mb-2">🎓</div>
                  <h4 className="font-semibold text-gray-800">Diploma</h4>
                  <p className="text-gray-600 text-sm">Diploma_Master.pdf</p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Shkarko
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfiliAplikantit;

