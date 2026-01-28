import { useNavigate } from "react-router-dom";

function AplikantiCard({ aplikanti }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/aplikanti/${aplikanti._id}`);
  };

  return (
    <div>
      <div className="border">
        <p>{aplikanti.emri}</p>
        <p>{aplikanti.mbiemri}</p>
        <button type="button" className="border" onClick={handleClick}>
          Shiko me shume
        </button>
      </div>
    </div>
  );
}

export default AplikantiCard;
