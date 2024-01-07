"use client";

import { Provider } from "react-redux";
import ThemeRegistry from "./ThemeRegistry";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </Provider>
  );
};

export default Providers;
