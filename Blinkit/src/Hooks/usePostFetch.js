import React, { useState } from "react";
import { toast } from "react-hot-toast";
function usePostFetch() {
  const [loading, setLoading] = useState(false);
  const [registeredData, setregisteredData] = useState({});

  async function FetchData(url, options, callback = () => {}) {
    try {
      const data = await fetch(url, options);
      const userData = await data.json();
      console.log("userData", userData);
      console.log("data", data);

      if (data.ok && userData.statuscode === 200) {
        if (callback) callback(userData);
        setregisteredData(userData);
        console.log("bb");
        console.log("load");
        toast.success(userData.message);
      } else {
        toast.error(userData.message);
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.log(error);
    } finally {
      setLoading(!loading);
    }
  }

  return { FetchData, loading, registeredData };
}

export default usePostFetch;
