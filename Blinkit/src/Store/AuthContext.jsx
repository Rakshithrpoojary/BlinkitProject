import { createContext, useContext, useEffect, useState } from "react";
import usePostFetch from "../Hooks/usePostFetch";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetFetch } from "../Hooks/useGetFetch";
import { useDispatch } from "react-redux";
import { useractions } from "../slices/userslics";
import { Categoryaction } from "../slices/Categoryslice";
import SkeletonLoading from "../Components/SkeletonLoading";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isDropdownVisible, setisDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const [isauthenticated, setisauthenticated] = useState(
    Cookie.get("AccessToken")
  );
  const navigate = useNavigate();

  const { FetchData } = usePostFetch();
  const { userAccountdata, loadingdata } = useGetFetch(
    "http://localhost:3000/api/v1/users/profile",
    isauthenticated,
    (response) => {
      dispatch(useractions.userLogedIn(response));
    }
  );
  const { userAccountdata: categorydata, loadingdata: categoryloading } =
    useGetFetch(
      "http://localhost:3000/api/v1/users/getcategory",
      true,
      (response) => {
        console.log("RESPONSE", response);
        console.log("RESPONSECAT", response);
        dispatch(Categoryaction.AddCategory(response));
      }
    );
  const Registeruser = async (e, formdata) => {
    e.preventDefault();
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formdata),
    };
    await FetchData("http://localhost:3000/api/v1/users/register", obj);
  };
  const LoginHandler = async (e, loginDetails) => {
    e.preventDefault();
    await FetchData(
      "http://localhost:3000/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginDetails),
      },
      (response) => {
        if (response.statuscode == 200) {
          setisauthenticated(Cookie.get("AccessToken"));
          navigate("/");
        }
      }
    );
  };

  const LogoutHandler = async () => {
    await FetchData(
      "http://localhost:3000/api/v1/users/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      (response) => {
        if (response.statuscode == 200) {
          setisauthenticated(Cookie.get("AccessToken"));
          setisDropdownVisible(!isDropdownVisible);
          dispatch(useractions.userLogedIn(response.data));
          navigate("/");
        }
      }
    );
  };
  return (
    <div>
      <AuthContext.Provider
        value={{
          Registeruser,
          LoginHandler,
          isauthenticated,
          LogoutHandler,
          isDropdownVisible,
          setisDropdownVisible,
          loadingdata,
        }}
      >
        {loadingdata || categoryloading ? <SkeletonLoading /> : children}
      </AuthContext.Provider>
    </div>
  );
}
export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
