import React from 'react';
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import Home from './components/Homepage'
import LogIn from './components/login'
import Match from './components/match'
import SignUp from './components/signUp'
import Questions from './components/questions'
import ADDTrip from './components/AddTrip'
import Footer from './components/Footer';
import MyTrips from './components/mytips'
import './App.css'
import './index.css';

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/trip" element={<div><div className='mx-0 flex justify-center'><Navbar/></div><div><ADDTrip/></div></div>}>
      </Route>
      <Route path="/" element={
          <div>
          <div className='mx-0 flex justify-center'><Navbar />
          </div>
          <div><Home />
          </div>
          <Footer/>
          </div>} />
        {/* <Route path="/login" element={<div className='h-full mt-0 mb-0'><LogIn heading ="Welcome back to the TripMates Community" /></div>} /> */}
        <Route path="/login" element={<div className='h-full mt-0 mb-0'><LogIn heading ="Personalize Your Travel Experience" /></div>} />
        <Route path="/match" element={<div >
            <div className='mx-0 flex justify-center'><Navbar/></div>
            <div>
          <span className="text-black text-[50px] font-bold break-words font-poppins flex justify-center">
            Find a Travel Buddy
            </span>
            </div>
            <div><Match /></div></div>} />

            <Route path="/SignUp" element={<div className='h-full mt-0 mb-0'><SignUp heading ="Welcome to the TripMates Community" /></div>} />
       
            <Route path="/" element={<div><Footer/></div>}>
            </Route>
            <Route path="/questions" element={<div><Questions heading="Personalize Your Travel Experience"/></div>} />
            <Route path="/trips" element={<div><div className='mx-0 flex justify-center'><Navbar/></div><div><MyTrips/></div><div><Footer/></div></div>} />
            <Route path="/AddTrip" element={<div><div className='mx-0 flex justify-center'><Navbar/></div><div><ADDTrip/></div></div>} />
            
      </Routes>
      
    </div>
  );
};

export default App;
