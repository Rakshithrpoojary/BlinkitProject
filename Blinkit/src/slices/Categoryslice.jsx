import { createSlice } from "@reduxjs/toolkit";
const CategorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    searchresults: [],
  },
  reducers: {
    AddCategory: (state, action) => {
      console.log("ACTION>PAYLOAD", action.payload);
      state.category = action.payload;
      state.searchresults = action.payload.flatMap((cat) =>
        cat.SubcatogaryArray.flatMap((subcat) => subcat.Products)
      );
    },
    SearchResults: (state, action) => {
      console.log(action.payload);
      const products = state.category.flatMap((cat) =>
        cat.SubcatogaryArray.flatMap((subcat) => subcat.Products)
      );
      const searchresults = products.filter((products) =>
        products.productname
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      state.searchresults = searchresults;
    },
  },
});
export const Categoryaction = CategorySlice.actions;
export default CategorySlice;
