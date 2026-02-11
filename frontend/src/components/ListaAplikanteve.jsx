import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import AplikantiCard from "./AplikantiCard";
import "../index.css";

function ListaAplikanteve() {
  const [aplikantet, setAplikantet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/aplikantet/",
        );
        if (response.data.success) {
          setAplikantet(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setAplikantet([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="kompaniaCard">
        {aplikantet.map((a) => {
          return <AplikantiCard key={a._id} aplikanti={a} />;
        })}
      </div>
    </div>
  );
}

export default ListaAplikanteve;
