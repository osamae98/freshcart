"use client";

import { ReactNode, useRef} from "react";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import { AppStore, createStore, PreloadedState } from "@/store/store";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export default function Providers({ children, preloadedState }: ProvidersProps) {
  const storeRef = useRef<AppStore | null>(null)

  /* eslint-disable */
  if (storeRef.current == null) {
    storeRef.current = createStore(preloadedState)
  }

  return (
    <Provider store={storeRef.current!}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
    </Provider>
  );
}