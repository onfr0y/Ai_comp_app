import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TreeDeciduous = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 19l4-12 4 12" /><path d="M12 19v3" /><path d="M12 5.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" /><path d="M6.5 9a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" /><path d="M17.5 9a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
  </svg>
);



const SplitText = ({ text, className, delay = 50 }) => {
  const letters = text.split('');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => { 
      if (currentRef) {
        observer.unobserve(currentRef); 
      }
    };
  }, []);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`inline-block ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: `${isVisible ? index * delay : 0}ms` }}
          aria-hidden="true"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </p>
  );
};


const FeatureCard = ({ titleLines, IconComponent, onClick }) => (
  <div onClick={onClick} className="group relative p-4 rounded-2xl h-36 w-36 sm:h-40 sm:w-40 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl group-hover:bg-white/25 transition-colors duration-300"></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="text-left">
        {titleLines.map((line, index) => (
          <h3 key={index} className="text-white font-bold text-base sm:text-lg leading-tight tracking-wide">{line}</h3>
        ))}
      </div>
      <IconComponent className="absolute bottom-3 right-3 w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
    </div>
  </div>
);

// --- HomePage Component ---
const HomePage = () => {
  const navigate = useNavigate();

  const featuresData = [
    { id: 1, titleLines: ["WEATHER"], Icon: TreeDeciduous, page: 'weather' },
    { id: 2, titleLines: ["SALE", "PRICE"], Icon: TreeDeciduous, page: 'sales' },
    { id: 3, titleLines: ["SOIL", "ANALYSIS"], Icon: TreeDeciduous, page: 'soil' },
    { id: 4, titleLines: ["TALK", "W/ AI"], Icon: TreeDeciduous, page: 'ai' },
  ];
  

  const handleCardClick = (page) => {
    if (page === 'ai') {
      navigate('/ai');
    } else if (page === 'weather') {
      navigate('/weather');
    }
   
  };


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const commonTextStyle = "text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2";

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      <div className="relative font-sans bg-[url('https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center p-4">
       
        <div className="absolute inset-0 bg-black/40"></div>

        
        <div className="relative z-10 container mx-auto flex flex-col items-start justify-center w-full max-w-md h-full p-4 sm:p-6">
         
          <div className="flex flex-col w-full mb-10">
            <SplitText text={getGreeting()} className={commonTextStyle} delay={50} />
            <SplitText text="Let's talk about" className={commonTextStyle} delay={50} />
            <SplitText text="your farm..." className={commonTextStyle} delay={80} />
          </div>
          

          <div className="w-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {featuresData.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  titleLines={feature.titleLines}
                  IconComponent={feature.Icon}
                  onClick={() => handleCardClick(feature.page)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
