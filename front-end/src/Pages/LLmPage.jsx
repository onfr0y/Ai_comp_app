import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LlmBox from '../component/LlmBox';

const LLMPage = () => {
  const navigate = useNavigate(); // Get the navigate function

  return (
    <div className='relative font-sans bg-[url("https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg")] bg-cover bg-center min-h-screen w-full flex items-center justify-center p-4'>
      <LlmBox />
    </div>
  );
};

export default LLMPage;