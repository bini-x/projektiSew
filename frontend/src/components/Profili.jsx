import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Mail, Phone, Plus, Edit2, Upload, Link, X } from "lucide-react";

function Profili() {
  const navigate = useNavigate();
  const [perdoruesiData, setPerdoruesiData] = useState({});
  const { id } = useParams();
  const [linkeSociale, setLinkeSociale] = useState([]);
  const [shfaqLinkeForm, setShfaqLinkeForm] = useState(false);
  const [eksperienca, setEksperienca] = useState([]);
  const [shfaqFormenEksperienca, setShfaqFormenEksperienca] = useState(false);
  const [edukimi, setEdukimi] = useState([]);
  const [shfaqFormenEdukimi, setShfaqFormenEdukimi] = useState(false);
  const [projektet, setProjektet] = useState([]);
  const [shfaqFormenProjektet, setShfaqFormenProjektet] = useState(false);

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

  // Linki i ri
  const [linkRi, setLinkRi] = useState({
    platforma: "",
    url: "",
  });

  // Handle shtimin e linqeve
  const handleShtoLink = () => {
    if (linkRi.platforma && linkRi.url) {
      setLinkeSociale([...linkeSociale, { ...linkRi, id: Date.now() }]);
      setLinkRi({
        platforma: "",
        url: "",
      });
      setShfaqLinkeForm(false);
    }
  };

  // Set eksperiencen e re
  const [eksperienceRe, setEksperienceRe] = useState({
    titulli: "",
    kompania: "",
    dataFillimit: "",
    dataMbarimit: "",
    pershkrimi: "",
  });

  // Shto Eksperiencen
  const handleShtoEksperiencen = () => {
    if (eksperienceRe.titulli && eksperienceRe.kompania) {
      setEksperienca([...eksperienca, { ...eksperienceRe, id: Date.now() }]);
      setEksperienceRe({
        titulli: "",
        kompania: "",
        dataFillimit: "",
        dataMbarimit: "",
        pershkrimi: "",
      });
      setShfaqFormenEksperienca(false);
    }
  };

  const [edukimiRi, setEdukimiRi] = useState({
    diplome: "",
    instuticioni: "",
    dataFillimit: "",
    dataMbarimit: "",
    pershkrimi: "",
  });

  const handleShtoEdukimin = () => {
    if (edukimiRi.diplome && edukimiRi.instuticioni) {
      setEdukimi([...edukimi, { ...edukimiRi, id: Date.now() }]);
      setEdukimiRi({
        diplome: "",
        instuticioni: "",
        dataFillimit: "",
        dataMbarimit: "",
        pershkrimi: "",
      });
      setShfaqFormenEdukimi(false);
    }
  };

  const [projektRi, setProjektRi] = useState({
    emri: "",
    pershkrimi: "",
    teknologjite: "",
    link: "",
  });

  const handleShtoProjekt = () => {
    if (projektRi.emri) {
      setProjektet([...projektet, { ...projektRi, id: Date.now() }]);
      setProjektRi({
        emri: "",
        pershkrimi: "",
        teknologjite: "",
        link: "",
      });
      setShfaqFormenProjektet(false);
    }
  };

  // Fshij Linkin
  const handleFshijLinkin = (id) => {
    setLinkeSociale(linkeSociale.filter((link) => link.id !== id));
  };

  // Fshij Eksperiencen
  const handleFshijEksperiencen = (id) => {
    setEksperienca(eksperienca.filter((exp) => exp.id !== id));
  };

  const handleFshijEdukimin = (id) => {
    setEdukimi(edukimi.filter((edu) => edu.id !== id));
  };

  const handleFshijProjektin = (id) => {
    setProjektet(projektet.filter((proj) => proj.id !== id));
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header perdoruesiData={perdoruesiData} onCkycja={handleCkycja} />

      <div className="max-w-4xl mx-auto mb-2 mt-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-2">
          <div className="h-32 bg-white/30">
            <div className="flex justify-end p-10 gap-2">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                <Edit2 size={20} className="text-gray-600" />
              </button>
              <button className="publikoPune flex items-center gap-2 px-4 py-2 ">
                <Upload size={18} />
                Ngarko CV
              </button>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-black text-4xl font-bold shadow-xl border-4 border-blue-100">
                {getInitials()}
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1 relative">
                <h1 className="text-left text-3xl mb-1">
                  {perdoruesiData?.emri || perdoruesiData?.kompania}{" "}
                  {perdoruesiData?.mbiemri}
                </h1>
                <div className="space-y-2 mt-4">
                  a{" "}
                  <p className="paragrafProfili">
                    <Mail size={16} />
                    {perdoruesiData.email}
                  </p>
                  <p className="paragrafProfili">
                    <Phone size={16} />
                    {perdoruesiData.nrTelefonit}
                  </p>
                  <div className="mt-4">
                    <div className="flex flex-wrap ">
                      {linkeSociale.map((link) => (
                        <div key={link.id} className="group relative">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                          >
                            <Link size={14} />
                            {link.platforma}
                          </a>
                          <button
                            onClick={() => handleFshijLinkin(link.id)}
                            className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setShfaqLinkeForm(!shfaqLinkeForm)}
                        className="inline-flex items-center gap-1 px-3 py-1 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <Plus size={14} />
                        Shto Link
                      </button>
                    </div>

                    {shfaqLinkeForm && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Platforma (p.sh. LinkedIn, GitHub)"
                            value={linkRi.platforma}
                            onChange={(e) =>
                              setLinkRi({
                                ...linkRi,
                                platforma: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="url"
                            placeholder="URL"
                            value={linkRi.url}
                            onChange={(e) =>
                              setLinkRi({ ...linkRi, url: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleShtoLink}
                              className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            >
                              Ruaj
                            </button>
                            <button
                              onClick={() => setShfaqLinkeForm(false)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                            >
                              Anulo
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* eksperienca  */}
        <div className="min-h-screen bg-gray-100 ">
          <div className="max-w-4xl mx-auto ">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
              <div className="flex items-center justify-between -2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Eksperienca
                  </h2>
                </div>
                <button
                  className="flex items-center gap-1"
                  onClick={() =>
                    setShfaqFormenEksperienca(!shfaqFormenEksperienca)
                  }
                >
                  <Plus
                    size={28}
                    className="hover:bg-gray-100 p-1 rounded-full"
                  />
                </button>
              </div>
              {shfaqFormenEksperienca && (
                <div className="px-6 py-4 bg-gray-50 mt-5">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Titulli i pozicionit"
                      value={eksperienceRe.titulli}
                      onChange={(e) =>
                        setEksperienceRe({
                          ...eksperienceRe,
                          titulli: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Kompania"
                      value={eksperienceRe.kompania}
                      onChange={(e) =>
                        setEksperienceRe({
                          ...eksperienceRe,
                          kompania: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        placeholder="Data fillimit"
                        value={eksperienceRe.dataFillimit}
                        onChange={(e) =>
                          setEksperienceRe({
                            ...eksperienceRe,
                            dataFillimit: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        placeholder="Data mbarimit"
                        value={eksperienceRe.dataMbarimit}
                        onChange={(e) =>
                          setEksperienceRe({
                            ...eksperienceRe,
                            dataMbarimit: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      placeholder="Përshkrimi"
                      value={eksperienceRe.pershkrimi}
                      onChange={(e) =>
                        setEksperienceRe({
                          ...eksperienceRe,
                          pershkrimi: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleShtoEksperiencen}
                        className="publikoPune"
                      >
                        Ruaj
                      </button>
                      <button
                        onClick={() => setShfaqFormenEksperienca(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Anulo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 py-4">
                {eksperienca.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nuk ka përvoja të shtuar ende
                  </p>
                ) : (
                  <div className="space-y-4">
                    {eksperienca.map((exp) => (
                      <div
                        key={exp.id}
                        className="border-l-4 border-blue-500 pl-4 py-2 relative group"
                      >
                        <button
                          onClick={() => handleFshijEksperiencen(exp.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={18} />
                        </button>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {exp.titulli}
                        </h3>
                        <p className="text-gray-700">{exp.kompania}</p>
                        <p className="text-sm text-gray-500">
                          {exp.dataFillimit} - {exp.dataMbarimit || "Aktuale"}
                        </p>
                        {exp.pershkrimi && (
                          <p className="text-gray-600 mt-2">{exp.pershkrimi}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Edukimi */}

              <hr className="border-gray-200" />
              <div className="flex items-center justify-between mb-6 mt-10">
                <div className="flex items-center gap-2 ">
                  <h2 className="text-2xl font-semibold text-gray-900  ">
                    Edukimi
                  </h2>
                </div>
                <button
                  className="flex items-center gap-1"
                  onClick={() => setShfaqFormenEdukimi(!shfaqFormenEdukimi)}
                >
                  <Plus
                    size={28}
                    className="hover:bg-gray-100 p-1 rounded-full"
                  />
                </button>
              </div>
              {shfaqFormenEdukimi && (
                <div className="px-6 py-4 bg-gray-50 ">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Diploma/Titulli"
                      value={edukimiRi.diplome}
                      onChange={(e) =>
                        setEdukimiRi({
                          ...edukimiRi,
                          diplome: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Institucioni"
                      value={edukimiRi.instuticioni}
                      onChange={(e) =>
                        setEdukimiRi({
                          ...edukimiRi,
                          instuticioni: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        placeholder="Data fillimit"
                        value={edukimiRi.dataFillimit}
                        onChange={(e) =>
                          setEdukimiRi({
                            ...edukimiRi,
                            dataFillimit: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        placeholder="Data mbarimit"
                        value={edukimiRi.dataMbarimit}
                        onChange={(e) =>
                          setEdukimiRi({
                            ...edukimiRi,
                            dataMbarimit: e.target.value,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      placeholder="Përshkrimi"
                      value={edukimiRi.pershkrimi}
                      onChange={(e) =>
                        setEdukimiRi({
                          ...edukimiRi,
                          pershkrimi: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleShtoEdukimin}
                        className="publikoPune"
                      >
                        Ruaj
                      </button>
                      <button
                        onClick={() => setShfaqFormenEdukimi(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Anulo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 py-4">
                {edukimi.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nuk ka arsimim të shtuar ende
                  </p>
                ) : (
                  <div className="space-y-4">
                    {edukimi.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-l-4 border-purple-500 pl-4 py-2 relative group"
                      >
                        <button
                          onClick={() => handleFshijEdukimin(edu.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={18} />
                        </button>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {edu.diplome}
                        </h3>
                        <p className="text-gray-700">{edu.instuticioni}</p>
                        <p className="text-sm text-gray-500">
                          {edu.dataFillimit} - {edu.dataMbarimit || "Aktuale"}
                        </p>
                        {edu.pershkrimi && (
                          <p className="text-gray-600 mt-2">{edu.pershkrimi}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Projektet */}
              <hr className="border-gray-200" />
              <div className="flex items-center justify-between mb-6 mt-10">
                <div className="flex items-center gap-2 ">
                  <h2 className="text-2xl font-semibold text-gray-900  ">
                    Projektet
                  </h2>
                </div>
                <button
                  className="flex items-center gap-1"
                  onClick={() => setShfaqFormenProjektet(!shfaqFormenProjektet)}
                >
                  <Plus
                    size={28}
                    className="hover:bg-gray-100 p-1 rounded-full"
                  />
                </button>
              </div>
              {shfaqFormenProjektet && (
                <div className="px-6 py-4 bg-gray-50 ">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Emri i projektit"
                      value={projektRi.name}
                      onChange={(e) =>
                        setProjektRi({ ...projektRi, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Përshkrimi"
                      value={projektRi.pershkrimi}
                      onChange={(e) =>
                        setProjektRi({
                          ...projektRi,
                          pershkrimi: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <input
                      type="text"
                      placeholder="Teknologjitë (p.sh. React, Node.js, MongoDB)"
                      value={projektRi.teknologjite}
                      onChange={(e) =>
                        setProjektRi({
                          ...projektRi,
                          teknologjite: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Link (opsionale)"
                      value={projektRi.link}
                      onChange={(e) =>
                        setProjektRi({ ...projektRi, link: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleShtoProjekt}
                        className="publikoPune"
                      >
                        Ruaj
                      </button>
                      <button
                        onClick={() => setShfaqFormenProjektet(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Anulo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 py-4">
                {projektet.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nuk ka projekte të shtuara ende
                  </p>
                ) : (
                  <div className="space-y-4">
                    {projektet.map((proj) => (
                      <div
                        key={proj.id}
                        className="border-l-4 border-green-500 pl-4 py-2 relative group"
                      >
                        <button
                          onClick={() => handleFshijProjektin(proj.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={18} />
                        </button>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {proj.name}
                        </h3>
                        {proj.pershkrimi && (
                          <p className="text-gray-600 mt-2">
                            {proj.pershkrimi}
                          </p>
                        )}
                        {proj.teknologjite && (
                          <p className="text-sm text-gray-500 mt-2">
                            <span className="font-medium">Teknologjitë:</span>{" "}
                            {proj.teknologjite}
                          </p>
                        )}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                          >
                            Shiko projektin →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profili;
