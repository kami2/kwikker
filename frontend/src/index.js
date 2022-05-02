import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Single from './components/Single';
import ProfilePage from './components/ProfilePage';
import reportWebVitals from './reportWebVitals';



const routing = (
  <BrowserRouter basename='/'>
    <React.StrictMode>
      <Header />
      <Routes>
          <Route exact path='/' element={<App />} />
          <Route exact path='/kwik/:id' element={<Single />} />
          <Route exact path='/profile/:id' element={<ProfilePage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </BrowserRouter>
);


ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
