import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";

function Kycja() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!data.email) {
      alert("sheno email");
      return;
    }
    if (!data.password) {
      alert("sheno password");
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <p className="font-bold py-10 text-2xl">Kycu</p>
        <form onSubmit={validateForm}>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="fjalekalimi">Fjalekalimi</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Fjalekalimi"
                className="border"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute px-2"
              >
                {showPassword ? "Fshih" : "Shfaq"}
              </button>
            </div>
          </div>
          <button type="submit" className="block">
            Kycu
          </button>
          <p className="inline">Nuk keni llogari?</p>
          <Link to="/regjistrimi">Regjistrohu</Link>
        </form>
      </div>
    </div>
  );
}

export default Kycja;
