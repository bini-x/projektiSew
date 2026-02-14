import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import KompaniaCard from "./KompaniaCard";

function ListaKompanive() {
  const [kompanite, setKompanite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/kompania/kompanite",
        );

        if (response.data.success) {
          setKompanite(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setKompanite([]);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="bg-linear-to-br from-[#F7FBFC] to-[#B9D7EA] pb-10  shadow-[#0F4C75] ">
      <Header />
      <div className="kompaniaCard" > 
        {kompanite.map((k) => {
          return <KompaniaCard key={k._id} kompania={k} />;
        })}
      </div>
      </div>
    
  );
}

export default ListaKompanive;
