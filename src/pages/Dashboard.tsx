import { useEffect, useState } from "react";
import {
  getSession as DS_auth_getSession,
  refresh as DS_auth_refresh,
} from "../services/DataSourece/auth";
import { IUserProfile as IUserProfile_Type } from "../types/Dashboard";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<IUserProfile_Type>();
  const [islogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  console.log(userInfo);

  const getsession = async () => {
    try {
      const session = await DS_auth_getSession();
      setUserInfo(session);
      console.log("ess", session);
      if (session.message == "Token Expired!") {
        console.log("kos");

        const refreshResult = await DS_auth_refresh();
        document.cookie = `accessToken=${refreshResult.accessToken}; max-age=${
          7 * 24 * 60 * 60
        }; path=/`;
        document.cookie = `refreshToken=${
          refreshResult.refreshToken
        }; max-age=${7 * 24 * 60 * 60}; path=/`;
        const session = await DS_auth_getSession();
        setUserInfo(session);
      } else if (session.message == "Invalid/Expired Token!") {
        navigate("/login");
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.error("خطا دریافت توکن:", error);
    }
  };

  useEffect(() => {
    getsession();
  }, []);

  return (
    <>
      {islogin && (
        <div className="h-screen flex ">
          <div className="flex bg-neutral-300 flex-col w-[20%] items-center">
            <img
              className="w-20 h-20 rounded-full"
              src={userInfo?.image}
              alt="userImage"
            />
            {userInfo?.firstName} {userInfo?.lastName}
          </div>
          <div className="flex flex-col w-[80%]"></div>
        </div>
      )}
      {!islogin && (
        <div className="loader fixed start-1/2 -translate-x-1/2 bottom-1/2 -translate-y-1/2"></div>
      )}
    </>
  );
};

export default Dashboard;
