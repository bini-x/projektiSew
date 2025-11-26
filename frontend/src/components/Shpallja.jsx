import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import "../index.css";

function Shpallja() {
  return (
    <div className="flex justify-center gap-7 border px-5 py-5 my-10 w-fit h-fit cursor-pointer">
      <FontAwesomeIcon icon={faAmazon} className="text-5xl" />
      <div className="px-5">
        <p className="font-bold text-xl">Vendi Punes</p>
        <p>
          <FontAwesomeIcon icon={faBriefcase} />
          Shitje
        </p>
        <p>
          <FontAwesomeIcon icon={faLocationDot} />
          Koretin
        </p>
      </div>
      <FontAwesomeIcon icon={faBookmark} />
    </div>
  );
}

export default Shpallja;
