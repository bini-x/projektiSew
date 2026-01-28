import AplikantiCard from "./AplikantiCard";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

function BallinaPundhenesit() {
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
      }
    };

    fetchData();
  }, [aplikantet]);

  return (
    <div>
      <Header />
      {aplikantet.map((a) => {
        return <AplikantiCard key={a._id} aplikanti={a} />;
      })}
    </div>
  );
}

export default BallinaPundhenesit;
