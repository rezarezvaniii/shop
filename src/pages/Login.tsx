import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as DS_auth_login } from "../services/DataSourece/auth";
import { ILogin } from "../types/Login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isValidEmail = (email: string) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };
    if (username == "") {
      setUsernameError("لطفا ایمیل خود را وارد کنید");
      return;
    } else {
      setUsernameError("");
    }
    if (!isValidEmail(username) && username !== "") {
      setUsernameError("لطفا یک ایمیل معتبر وارد کنید");
      return;
    } else {
      setUsernameError("");
    }

    if (password == "") {
      setPasswordError("لطفا پسورد را وارد کنید");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const session: ILogin = await DS_auth_login(username, password);
      document.cookie = `accessToken=${session.accessToken}; max-age=${
        7 * 24 * 60 * 60
      }; path=/`;
      document.cookie = `refreshToken=${session.refreshToken}; max-age=${
        7 * 24 * 60 * 60
      }; path=/`;
      document.cookie = `username=${session.firstName}; max-age=${
        7 * 24 * 60 * 60
      }; path=/`;
      document.cookie = `username=${session.firstName}; max-age=${
        7 * 24 * 60 * 60
      }; path=/`;
      navigate("/dashboard");
    } catch (error) {
      console.error("خطا در لاگین:", error);
    }
  };

  return (
    <>
      <main className="relative h-screen bg-custom-gradient gap-4 font-Vazirmatn-Medium overflow-y-auto scroll-Market flex bg-violet-600 justify-center flex-col items-center w-full">
        <div className="flex flex-col gap-2 justify-center items-center z-20"></div>
        <div className="flex flex-col gap-8 w-[400px] justify-center items-center z-20 rounded-3xl p-4 bg-white/20">
          <p className="font-semibold text-white text-2xl">ورود</p>
          <div className="w-full relative">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="username"
            >
              نام کاربری
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-xl outline-none"
            />
            <span className="absolute -bottom-6 text-red-400 start-2">
              {usernameError}
            </span>
          </div>
          <div className="w-full relative">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="username"
            >
              رمز ورود
            </label>
            <input
              id="username"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-xl outline-none"
            />
            <span className="absolute -bottom-6 text-red-400 start-2">
              {passwordError}
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="flex w-full bg-red-400  py-3 mt-4 bg-primary rounded-2xl text-white text-center font-Vazirmatn-Bold text-lg justify-center"
          >
            ورود
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;
