import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaMapMarkerAlt, FaGraduationCap, FaBriefcase, 
  FaStar, FaEdit, FaSave, FaTimes, FaLanguage, 
  FaCertificate, FaTools
} from 'react-icons/fa';
import Header from "./Header";

const ProfiliAplikantit = () => {
  // State për të dhënat e aplikantit
  const [aplikanti, setAplikanti] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  // Të dhëna demo për aplikantin
  const demoAplikanti = {
    id: 1,
    emri: "Ardit Rexhepi",
    email: "ardit.rexhepi@example.com",
    telefon: "+383 44 123 456",
    dataLindjes: "15/05/1995",
    vendodhja: "Prishtinë",
    fotoProfili: "https://via.placeholder.com/150",
    profesioni: "Zhvillues Software",
    viteshEksperience: 5,
    piketVleresimit: 4.7,
    bio: "Zhvillues software me më shumë se 5 vjet përvojë në teknologjitë moderne të web dhe mobile. Specializuar në React, Node.js dhe sisteme cloud.",
    
    // Arsimi
    arsimi: [
      {
        id: 1,
        institucioni: "Universiteti i Prishtinës",
        drejtimi: "Shkenca Kompjuterike",
        niveli: "Master",
        vitiFillimit: "2014",
        vitiMbarimit: "2018",
        pershkrimi: "Specializim në inxhinieri software dhe algoritme"
      },
      {
        id: 2,
        institucioni: "Gjimnazi ",
        drejtimi: "Shkenca Natyrore",
        niveli: "Gjimnaz",
        vitiFillimit: "2010",
        vitiMbarimit: "2014"
      }
    ],
    
    // Përvoja profesionale
    pervoja: [
      {
        id: 1,
        pozita: "Senior React Developer",
        kompania: "Tech Solutions KS",
        dataFillimit: "01/2020",
        dataMbarimit: "Present",
        pershkrimi: "Zhvillimi i aplikacioneve web të mëdha, menaxhimi i ekipit, arkitektura e sistemeve"
      },
      {
        id: 2,
        pozita: "Web Developer",
        kompania: "Digital Agency",
        dataFillimit: "06/2018",
        dataMbarimit: "12/2019",
        pershkrimi: "Zhvillim frontend dhe backend për klientë të ndryshëm"
      }
    ],
    
    // Aftësitë - Ndryshimi kryesor këtu
    aftesite: {
      primare: [
        { emri: "React", nivel: 90 },
        { emri: "JavaScript", nivel: 95 },
        { emri: "Node.js", nivel: 85 },
        { emri: "HTML/CSS", nivel: 95 }
      ],
      sekondare: [
        { emri: "MongoDB", nivel: 80 },
        { emri: "Git", nivel: 90 },
        { emri: "Docker", nivel: 70 },
        { emri: "TypeScript", nivel: 75 }
      ],
      gjuhët: [
        { emri: "Shqip", nivel: "Ametare" },
        { emri: "Anglisht", nivel: "Fluente" },
        { emri: "Gjermanisht", nivel: "Mesatare" }
      ],
      tjera: [
        "Komunikim Efektiv",
        "Puna në Ekip",
        "Zgjidhja e Problemeve",
        "Menaxhimi i Projekteve"
      ]
    },
    
    // Certifikimet
    certifikimet: [
      {
        id: 2,
        emri: "React Advanced",
        institucioni: "Udemy",
        data: "2021"
      }
    ],
    
    // Projekte
    projektet: [
      {
        id: 1,
        emri: "Sistemi i Menaxhimit të Punësimit",
        pershkrimi: "Platformë e plotë për menaxhimin e proceseve të punësimit",
        teknologjite: ["React", "Node.js", "MongoDB", "AWS"],
        link: "https://github.com/ardit/punet-platform"
      }
    ],
    
    // Preferencat e punës
    preferencat: {
      pozitat: ["Full Stack Developer", "Frontend Developer", "Team Lead"],
      industria: ["Teknologji", "Financë", "E-commerce"],
      lokacioni: ["Remote", "Prishtinë", "Ferizaj"],
      pagaMin: "1500€"
    }
  };

  // Simulojmë fetching e të dhënave
  useEffect(() => {
    const fetchAplikanti = async () => {
      try {
        setLoading(true);
        // Simulim delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAplikanti(demoAplikanti);
        setLoading(false);
      } catch (err) {
        setError("Gabim në ngarkimin e të dhënave");
        setLoading(false);
      }
    };

    fetchAplikanti();
  }, []);

  // Funksioni për fillimin e editimit
  const handleEdit = () => {
    setTempData(aplikanti);
    setEditing(true);
  };

  // Funksioni për ruajtjen e ndryshimeve
  const handleSave = () => {
    setAplikanti(tempData);
    setEditing(false);
    // Në aplikacion real, këtu do të bëhet API call për të ruajtur ndryshimet
  };

  // Funksioni për anulimin e editimit
  const handleCancel = () => {
    setEditing(false);
  };

  // Funksioni për ndryshimin e fushave
  const handleChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Komponenti për shfaqjen e aftësive - KODI I NDRYSHUAR
  const AftesiteSection = ({ aftesite }) => {
    if (!aftesite) return null;
    
    return (
      <div className="space-y-8">
        {/* Aftësitë primare */}
        {aftesite.primare && aftesite.primare.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                 Aftësitë Primare
              </h4>
              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {aftesite.primare.length} aftësi
              </span>
            </div>
            
            <div className="space-y-4">
              {aftesite.primare.map((aftesia, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">{aftesia.emri}</span>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aftësitë sekondare */}
        {aftesite.sekondare && aftesite.sekondare.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Aftësitë Sekondare
              </h4>
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {aftesite.sekondare.length} aftësi
              </span>
            </div>
            
            <div className="space-y-3">
              {aftesite.sekondare.map((aftesia, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{aftesia.emri}</span>
                 
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gjuhët */}
        {aftesite.gjuhët && aftesite.gjuhët.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
               Gjuhët
            </h4>
            <div className="flex flex-wrap gap-3">
              {aftesite.gjuhët.map((gjuha, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                >
                  {gjuha.emri} - {gjuha.nivel}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Aftësitë e tjera */}
        {aftesite.tjera && aftesite.tjera.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Aftësitë e Tjera</h4>
            <div className="flex flex-wrap gap-2">
              {aftesite.tjera.map((aftesia, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {aftesia}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Komponenti për shfaqjen e edukimit
  const EdukimiSection = ({ arsimi }) => {
    if (!arsimi || arsimi.length === 0) return null;
    
    return (
      <div className="space-y-6">
        {arsimi.map((item, index) => (
          <div key={item.id} className="relative pl-8">
            <div className="absolute left-0 top-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 font-bold rounded text-sm">
                {item.vitiFillimit} - {item.vitiMbarimit}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {item.drejtimi}
            </h4>
            <p className="text-gray-700 font-medium">{item.institucioni}</p>
            <p className="text-gray-600">{item.niveli}</p>
            {item.pershkrimi && (
              <p className="text-gray-600 mt-2">{item.pershkrimi}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Komponenti për shfaqjen e përvojës
  const PervojaSection = ({ pervoja }) => {
    if (!pervoja || pervoja.length === 0) return null;
    
    return (
      <div className="space-y-6">
        {pervoja.map((item, index) => (
          <div key={item.id} className="relative pl-8">
            <div className="absolute left-0 top-0 w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 font-bold rounded text-sm">
                {item.dataFillimit} - {item.dataMbarimit}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {item.pozita}
            </h4>
            <p className="text-gray-700 font-medium">{item.kompania}</p>
            <p className="text-gray-600 mt-2">{item.pershkrimi}</p>
          </div>
        ))}
      </div>
    );
  };

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
                      src={editing ? tempData.fotoProfili : aplikanti.fotoProfili} 
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
                          onChange={(e) => handleChange('emri', e.target.value)}
                          className="bg-transparent border-b border-white text-white"
                        />
                      ) : aplikanti.emri}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {editing ? (
                        <input
                          type="text"
                          value={tempData.profesioni}
                          onChange={(e) => handleChange('profesioni', e.target.value)}
                          className="bg-transparent border-b border-blue-100 text-blue-100"
                        />
                      ) : aplikanti.profesioni}
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Rreth Meje</h3>
                {editing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full h-40 p-3 border rounded-lg"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{aplikanti.bio}</p>
                )}
              </div>

              {/* Edukimi */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
                  <FaGraduationCap /> Edukimi
                </h3>
                <EdukimiSection arsimi={aplikanti.arsimi} />
              </div>

              {/* Përvoja profesionale */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
                  <FaBriefcase /> Përvoja Profesionale
                </h3>
                <PervojaSection pervoja={aplikanti.pervoja} />
              </div>
                
              {/* Aftësitë - Këtu përdoret komponenti i ri */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Aftësitë</h3>
                <AftesiteSection aftesite={aplikanti.aftesite} />
              </div>
            </div>

            {/* Kolona e djathtë - Informacione shtesë */}
            <div className="space-y-6">
              {/* Informacione kontaktuese */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Informacione Kontaktuese</h3>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Preferencat e Punës</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pozitat e preferuara</p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat.pozitat.map((pozita, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {pozita}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Industria e preferuar</p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat.industria.map((industri, index) => (
                        <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {industri}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Lokacioni i preferuar</p>
                    <div className="flex flex-wrap gap-2">
                      {aplikanti.preferencat.lokacioni.map((lokacion, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                          {lokacion}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Paga minimale e pritur</p>
                    <p className="text-gray-700 font-medium">{aplikanti.preferencat.pagaMin}</p>
                  </div>
                </div>
              </div>

              {/* Certifikimet */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Certifikimet</h3>
                <div className="space-y-3">
                  {aplikanti.certifikimet.map((certifikimi) => (
                    <div key={certifikimi.id} className="border-l-4 border-blue-500 pl-3">
                      <h4 className="font-semibold text-gray-800">{certifikimi.emri}</h4>
                      <p className="text-gray-600 text-sm">{certifikimi.institucioni}</p>
                      <p className="text-gray-500 text-xs">{certifikimi.data}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projekte */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Projektet</h3>
                <div className="space-y-3">
                  {aplikanti.projektet.map((projekti) => (
                    <div key={projekti.id} className="p-3 border rounded-lg hover:bg-gray-50">
                      <h4 className="font-semibold text-gray-800 mb-1">{projekti.emri}</h4>
                      <p className="text-gray-600 text-sm mb-2">{projekti.pershkrimi}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {projekti.teknologjite.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
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
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Dokumentet</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-blue-600 text-3xl mb-2">📄</div>
                  <h4 className="font-semibold text-gray-800">CV</h4>
                  <p className="text-gray-600 text-sm">Ngarko CV_Punesohu.pdf</p>
                  <button className="mt-2 text-blue-600 hover:underline text-sm">
                    Shkarko
                  </button>
                </div>
                
                <div className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                  <div className="text-green-600 text-3xl mb-2">📃</div>
                  <h4 className="font-semibold text-gray-800">Letër Rekomandimi</h4>
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