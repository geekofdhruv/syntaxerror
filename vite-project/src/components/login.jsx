import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = ({ heading }) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to login with:", { email, password });

      // Step 1: Get access and refresh tokens
      const tokenResponse = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      });

      console.log("Login successful, token response:", tokenResponse.data);

      // Store tokens in localStorage
      localStorage.setItem('access_token', tokenResponse.data.access);
      localStorage.setItem('refresh_token', tokenResponse.data.refresh);

      // Check if this is the first login
      const isFirstLogin = !localStorage.getItem('first_login');
      
      // Step 2: Fetch all users to find the user ID
      const userResponse = await axios.get('http://127.0.0.1:8000/users/', {
        headers: {
          'Authorization': `Bearer ${tokenResponse.data.access}`, // Include access token for authentication
        },
      });

      console.log("All users fetched:", userResponse.data);
      
      const user = userResponse.data.find(user => user.email === email);
      
      if (user) {
        const userId = user.id;
        localStorage.setItem('user_id', userId);

        // If it's the first login, set the flag and navigate to questions
        if (isFirstLogin) {
          localStorage.setItem('first_login', 'true'); // Set the first login flag
          navigate('/questions');
        } else {
          // For subsequent logins, navigate to the main page or dashboard
          navigate('/');
        }
      } else {
        console.error("No user found with that email.");
      }
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
    }
  };

  const goTosignupPage = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-screen w-full">
      {/* Left side for the image */}
      <img 
        className="hidden lg:block lg:w-1/2 h-full object-cover" 
        src="/image1.jpg" 
        alt="Placeholder" 
      />

      {/* Right side for the login form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg text-center text-[#242424] text-3xl lg:text-4xl font-bold">
          {heading}
        </div>

        {/* Form Fields */}
        <form className="w-full max-w-md lg:max-w-lg mt-8 lg:mt-12 flex flex-col gap-6 lg:gap-8" onSubmit={handleLogin}>
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Email or Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          <div className="w-full max-w-md lg:max-w-lg flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-20 mt-8 lg:mt-12">
            <div className="flex items-center gap-2 lg:gap-3">
              <input
                type="checkbox"
                className="appearance-none w-[20px] lg:w-[25px] h-[20px] lg:h-[26px] rounded-[3px] border-[1px] border-[rgba(123,118,241,0.25)] checked:bg-[#7B76F1]"
              />
              <span className="text-[#757575] text-sm lg:text-lg font-normal">Remember me</span>
            </div>

            <div className="w-full lg:w-[180px] h-[50px] lg:h-[64px]">
              <button type="submit" className="w-full h-full bg-[#FE9052] rounded-[32px] shadow-[0px_34px_40px_-8px_rgba(123,118,241,0.24)] text-white text-base lg:text-lg font-bold leading-[24px]">
                LOG IN
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 lg:mt-12 text-center">
          <span className="text-[#424242] text-sm lg:text-lg font-normal">No Account yet? </span>
          <span onClick={goTosignupPage} className="text-[#FF5C01] text-sm lg:text-base font-bold underline cursor-pointer">SIGN UP</span>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
