import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/authentication/LoginPage';
import SignupPage from './pages/authentication/SignupPage';
import Admin from './pages/admin/adminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<Admin />} exact></Route>
            <Route path="*" element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
