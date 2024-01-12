import { baseApi } from "./api/baseApi";
import siteReducer from "./feature/siteSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  site: siteReducer,
};
