import Header from "./Header";
import Kerkimi from "./Kerkimi";
import ShpalljaCard from "./ShpalljaCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  UserPen,
  TrendingUp,
  BookPlus,
  Users,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
// Import the office background image
import officeBackground from "../assets/office-background.png";

function BallinaMysafir() {
  const navigate = useNavigate();
  const [shpalljaData, setShpalljaData] = useState([]);
  const [kerkoParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shpallja/kompania",
        );
        if (response.data.success) {
          const shpalljetAktive = response.data.data.filter(
            (shpallja) => shpallja.status === "aktiv",
          );
          setShpalljaData(shpalljetAktive || []);
        }
      } catch (err) {
        console.error(err);
        setShpalljaData([]);
      }
    };
    fetchData();
  }, []);

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
            console.error("Gabim ne kerkim:  ", response.data.error);
          }
        } else {
          const response = await axios.get(
            "http://localhost:3000/api/shpallja/kompania",
          );
          if (response.data.success) {
            const shpalljetAktive = response.data.data.filter(
              (shpallja) => shpallja.status === "aktiv",
            );
            setShpalljaData(shpalljetAktive || []);
          }
        }
      } catch (err) {
        console.error(err);
        setShpalljaData([]);
      }
    };

    fetchData();
  }, [kerkoParams]);

  return (
    <div className="relative">
      <Header />
      
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[700px] flex flex-col items-center justify-start overflow-hidden pt-32">
        {/* Background Image - No Blur */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${officeBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay with new colors */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(to bottom, rgba(15, 76, 117, 0.6), rgba(109, 148, 197, 0.5), rgba(15, 76, 117, 0.7))'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-32 left-10 z-10 opacity-20">
          <Sparkles size={40} color="#6d94c5" />
        </div>
        <div className="absolute bottom-32 right-20 z-10 opacity-20">
          <Sparkles size={50} color="#6d94c5" />
        </div>
        
        {/* Content - Positioned much higher */}
        <div className="relative z-20 text-center px-4">
          {/* Subtitle above main heading */}
          <p className="text-lg md:text-xl text-white/90 mb-3 font-light tracking-wide">
            Platforma më e madhe e punësimit në Kosovë
          </p>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
            Gjeni punën perfekte për ju
          </h1>
          
          {/* Tagline below main heading */}
          <p className="text-base md:text-lg text-white/80 mb-8 font-light max-w-2xl mx-auto">
             Mundësi pune nga kompanitë më të mira
          </p>
          
          {/* Search Component */}
          <Kerkimi />
        </div>
      </div>

      {/* Two Column Section */}
      <div className="ballinaMysafir" style={{ background: 'linear-gradient(to bottom right, #e8f1f8, #d4e4f2)' }}>
        <div 
          className="containerballinamysafir bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ borderColor: 'rgba(109, 148, 197, 0.3)' }}
        >
          <h1 className="text-2xl font-semibold" style={{ color: '#0f4c75' }}>Po punësoni talentë?</h1>
          <p className="paragrafBallinaMysafir text-slate-700">
            Lidhu me kandidatë të kualifikuar dhe ndërto ekipin tënd. Publiko
            vende pune brenda pak minutash.
          </p>
          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <BookPlus size={20} style={{ color: '#6d94c5' }} />
            Publiko Punë
          </h2>
          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <Users size={20} style={{ color: '#6d94c5' }} />
            Rishikoni aplikantët
          </h2>

          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <BriefcaseBusiness size={20} style={{ color: '#6d94c5' }} />
            Menaxho Shpalljet
          </h2>
          <button
            type="button"
            className="publikoPune w-full transition-all duration-300"
            style={{ 
              background: 'linear-gradient(to right, #0f4c75, #6d94c5)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #0d3d5e, #5a7dad)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #0f4c75, #6d94c5)'}
            onClick={() => navigate("/kycja")}
          >
            Kycu
          </button>
        </div>
        <div 
          className="containerballinamysafir bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ borderColor: 'rgba(109, 148, 197, 0.3)' }}
        >
          <h1 className="text-2xl font-semibold m-auto" style={{ color: '#0f4c75' }}>Po kërkoni punë?</h1>
          <p className="paragrafBallinaMysafir text-slate-700">
            Gjeni mundësi të arta nga kompanit më të mira. Gjej punën e ëndrrave
            sot.
          </p>
          <br />
          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <Search size={20} style={{ color: '#6d94c5' }} /> Kërko Punë <br />
          </h2>
          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <UserPen size={20} style={{ color: '#6d94c5' }} />
            Ndërto Profilin
          </h2>
          <h2 className="info-ballinaMysafir" style={{ color: '#0f4c75' }}>
            <TrendingUp size={20} style={{ color: '#6d94c5' }} />
            Menaxho Aplikimet
          </h2>
          <button
            type="button"
            className="publikoPune w-full transition-all duration-300"
            style={{ 
              background: 'linear-gradient(to right, #0f4c75, #6d94c5)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #0d3d5e, #5a7dad)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #0f4c75, #6d94c5)'}
            onClick={() => navigate("/kycja")}
          >
            Kycu
          </button>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="m-10 md:m-15 lg:m-20 bg-white">
        <div className="shpalljaCard">
          {shpalljaData.slice(0, 9).map((shpallja) => {
            return <ShpalljaCard key={shpallja._id} shpallja={shpallja} />;
          })}
        </div>

        {shpalljaData.length === 0 && (
          <div className="text-center p-10">
            <p className="text-slate-600">Nuk ka punë të disponueshme</p>
          </div>
        )}

        {shpalljaData.length > 9 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              className="publikoPune px-8 py-3 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(to right, #0f4c75, #6d94c5)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #0d3d5e, #5a7dad)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #0f4c75, #6d94c5)'}
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