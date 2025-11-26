import Header from "./Header";
import Shpallja from "./Shpallja";
import "../index.css";

function ListaPuneve() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 justify-items-center">
        <Shpallja />
        <Shpallja />
        <Shpallja />
        <Shpallja />
        <Shpallja />
        <Shpallja />
      </div>
    </div>
  );
}

export default ListaPuneve;
