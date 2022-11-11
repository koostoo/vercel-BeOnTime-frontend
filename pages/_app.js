//-----------------------------------------------------
// _app.js : Spécification Next.js
//
// Utilisé pour injecter :
// - les reducers
// - Le Provider de chakra UI
// - le layout : Layout.js
//-----------------------------------------------------

// functional component - next.js Layout
import Layout from "../components/Layout";
// style
import "../styles/globals.css";

import Head from "next/head";
// UI
import { ChakraProvider } from "@chakra-ui/react";

import { useRouter } from "next/router";
// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import mission from "../reducers/mission";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({ user, mission });
const persistConfig = {
  key: "beOnTime",
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  const router = useRouter();

  let component = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  if (router.asPath == "/") {
    component = <Component {...pageProps} />;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>BeOnTime</title>
          <meta
            name="viewport"
            content="initial-scale=0.8, width=device-width"
          />
        </Head>
        <ChakraProvider>{component}</ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
