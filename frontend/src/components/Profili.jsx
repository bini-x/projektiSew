import "../index.css";
import Header from "./Header";
import Perdoruesi from "../PerdoruesiContext";
import ProfiliAplikantit from "./ProfiliAplikantit";
import ProfiliKompanise from "./ProfiliKompanise";

function Profili() {
  const { perdoruesiData } = Perdoruesi.usePerdoruesi();

  return (
    <div className="relative overflow-hidden ">
      <Header withGradient={true} />
      {perdoruesiData?.tipiPerdoruesit === "aplikant" ? (
        <ProfiliAplikantit />
      ) : (
        <ProfiliKompanise />
      )}
    </div>
  );
}

export default Profili;
