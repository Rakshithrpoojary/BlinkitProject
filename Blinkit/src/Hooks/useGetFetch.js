import { useEffect, useState } from "react";
export const useGetFetch = (url, shouldFetch, callback) => {
  console.log("useGetFetch");
  console.log("shouldFetch", shouldFetch);

  const [loadingdata, setloadingdata] = useState(true);
  const [userAccountdata, setuserAccountdata] = useState();
  useEffect(() => {
    console.log("Effect");
    if (!shouldFetch) {
      return setloadingdata(false);
    }
    const Fetchdata = async () => {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const response = await data.json();
      console.log("RESPONSE.DATA", response);
      if (callback) callback(response.data);
      setuserAccountdata(response.data);
      setloadingdata(false);
    };

    Fetchdata();
  }, [url, shouldFetch]);
  return { loadingdata, userAccountdata };
};
