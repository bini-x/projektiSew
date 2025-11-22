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
      <div
        class="flex justify-center items-center w-full sm:w-[300px] md:w-[400px] lg:w-[500px]
              h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]
              bg-white rounded-lg shadow-2xl p-8 sm:p-10 md:p-12"
        id=""
      >
        <div>
          <p className="font-bold py-10 text-2xl">Kycu</p>
          <form onSubmit={validateForm} className="space-y-5">
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="border rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="fjalekalimi">Fjalekalimi</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Fjalekalimi"
                  className="border rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
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
            <button
              type="submit"
              className="block border rounded-sm p-1 w-full sm:w-80 md:w-96 lg:w-[350px] h-10 sm:h-12 md:h-14 lg:h-10"
            >
              Kycu
            </button>
            <p className="inline">Nuk keni llogari?</p>
            <Link to="/regjistrimi">Regjistrohu</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Kycja;
