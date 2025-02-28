import { createContext, useContext } from "react";
import { configureStore } from "@reduxjs/toolkit";
import userslice, { useractions } from "../slices/userslics";
import usePostFetch from "../Hooks/usePostFetch";
import { useDispatch } from "react-redux";
import CategorySlice from "../slices/Categoryslice";
import { Categoryaction } from "../slices/Categoryslice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
export const ReduxStore = configureStore({
  reducer: {
    user: userslice.reducer,
    category: CategorySlice.reducer,
  },
});

const context = createContext();

function Store({ children }) {
  const { FetchData } = usePostFetch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Edituser = async (e, formdata) => {
    e.preventDefault();
    await FetchData(
      "http://localhost:3000/api/v1/users/edituser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      },
      (response) => {
        dispatch(useractions.userLogedIn(response.data));
      }
    );
  };

  const SubmitAddress = async (e, Address) => {
    e.preventDefault();
    await FetchData(
      "http://localhost:3000/api/v1/users/addadress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(Address),
      },
      (response) => {
        dispatch(useractions.userLogedIn(response.data));
      }
    );
  };

  const DeleteAddress = async (id) => {
    await FetchData(
      "http://localhost:3000/api/v1/users/deleteaddress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      },
      (response) => {
        dispatch(useractions.userLogedIn(response.data));
      }
    );
  };

  const UploadCategory = async (formdata) => {
    console.log(formdata.get("category"));
    await FetchData(
      "http://localhost:3000/api/v1/users/addcategory",
      {
        method: "POST",
        credentials: "include",
        body: formdata,
      },
      (response) => {
        console.log("Data", response.data);
        dispatch(Categoryaction.AddCategory(response.data.Categories));
      }
    );
  };
  const DeleteCategory = async (id) => {
    console.log("ID", id);
    await FetchData(
      "http://localhost:3000/api/v1/users/deletecategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      },
      (response) => {
        console.log("Data", response);
        dispatch(Categoryaction.AddCategory(response.data.Categories));
      }
    );
  };

  const AddSubcatogory = async (formdata, endpoint) => {
    console.log(formdata.get("subcatogaryname"));
    console.log(formdata.get("catogaryname"));
    console.log("imgae", formdata.get("subcateogaryimage"));

    await FetchData(
      `http://localhost:3000/api/v1/users/${endpoint}`,
      {
        method: "POST",
        credentials: "include",
        body: formdata,
      },
      (response) => {
        console.log("Data", response.data);
        dispatch(Categoryaction.AddCategory(response?.data?.Categories));
      }
    );
  };

  const DeleteSubCategory = async (cateogoryid, subcatogoryid) => {
    await FetchData(
      "http://localhost:3000/api/v1/users/deletesubcatogary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ cateogoryid, subcatogoryid }),
      },
      (response) => {
        console.log("Data", response);
        dispatch(Categoryaction.AddCategory(response.data.Categories));
      }
    );
  };
  const UploadProduct = async (adddata, productid, setFormdata) => {
    const formdata = new FormData();
    const endpoint = productid ? "editproduct" : "addproduct";
    const method = productid ? "PUT" : "POST";
    formdata.append("productname", adddata.productname);
    formdata.append("productdescription", adddata.productdescription);
    formdata.append("productimage", adddata.productimage);
    formdata.append("selectcateogary", adddata.selectcateogary);
    formdata.append("selectsubcateogary", adddata.selectsubcateogary);
    formdata.append("productunit", adddata.productunit);
    formdata.append("productstock", adddata.productstock);
    formdata.append("productprice", adddata.productprice);
    formdata.append("productdiscount", adddata.productdiscount);
    formdata.append("keyfeatures", adddata.keyfeatures);
    formdata.append("productid", productid);
    adddata?.productsubimages?.map((subing) =>
      formdata.append("productsubimages", subing)
    );
    console.log("getimages", formdata.get("productsubimages"));
    await FetchData(
      `http://localhost:3000/api/v1/users/${endpoint}`,
      {
        method: method,
        credentials: "include",
        body: formdata,
      },
      (response) => {
        console.log("Data", response.data);
        dispatch(Categoryaction.AddCategory(response?.data?.Categories));
        setFormdata((prev) =>
          Object.keys(prev).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {})
        );
        if (method === "PUT") {
          navigate("/dashboard/displayproduct");
        }
      }
    );
  };

  const DeleteProduct = async (id) => {
    await FetchData(
      "http://localhost:3000/api/v1/users/deleteproduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(id),
      },
      (response) => {
        console.log("Data", response);
        dispatch(Categoryaction.AddCategory(response.data.Categories));
      }
    );
  };

  const AddtoCart = async (product, event) => {
    event.preventDefault(); // Prevents default action
    await FetchData(
      "http://localhost:3000/api/v1/users/addtocart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      },
      (response) => {
        dispatch(useractions.userLogedIn(response.data));
      }
    );
  };
  const RemovefromCart = async (productid, event) => {
    event.preventDefault(); // Prevents default action

    await FetchData(
      "http://localhost:3000/api/v1/users/removefromcart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productid }),
      },
      (response) => {
        dispatch(useractions.userLogedIn(response.data));
      }
    );
  };
  const SearchResults = (searchvalue) => {
    dispatch(Categoryaction.SearchResults(searchvalue));
  };
  const PlaceOrder = async () => {
    await FetchData(
      "http://localhost:3000/api/v1/users/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      (response) => {
        console.log(response.data);
        dispatch(useractions.userLogedIn(response.data));
        navigate("/success");
      }
    );
  };
  const StripePayment = async (products) => {
    const stripe = await loadStripe(
      "pk_test_51QuyGxJ7IL7uDEG5BMA9WQ73IrJC0IPGpOzA8MqykQgmBxxWG9ut10cf4YGPJo1f0A8rvzNuQZz8Ulf6jhB3N6M800fl36FO4R"
    );
    await FetchData(
      "http://localhost:3000/api/v1/users/payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
        credentials: "include",
      },
      (response) =>
        stripe.redirectToCheckout({
          sessionId: response.data,
        })
    );
  };
  return (
    <div>
      <context.Provider
        value={{
          Edituser,
          SubmitAddress,
          DeleteAddress,
          UploadCategory,
          DeleteCategory,
          AddSubcatogory,
          DeleteSubCategory,
          UploadProduct,
          DeleteProduct,
          AddtoCart,
          RemovefromCart,
          SearchResults,
          PlaceOrder,
          StripePayment,
        }}
      >
        {children}
      </context.Provider>
    </div>
  );
}

export const useProvider = () => {
  return useContext(context);
};
export default Store;
