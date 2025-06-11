import React, { useState, useEffect, useRef } from 'react';

// --- Recreated Icon Component (from lucide-react) ---
// This SVG component is a stand-in for the original TreeDeciduous icon.
const TreeDeciduous = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 19l4-12 4 12" />
    <path d="M12 19v3" />
    <path d="M12 5.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
    <path d="M6.5 9a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
    <path d="M17.5 9a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
  </svg>
);

// --- SplitText Component (CSS Animation version) ---
// This component animates text by splitting it into individual letters
// and fading them in sequentially.
const SplitText = ({ text, className, delay = 50, onAnimationComplete }) => {
  const letters = text.split('');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Use IntersectionObserver to trigger animation when the component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
        if(ref.current) {
            observer.unobserve(ref.current);
        }
    };
  }, []);

  // Optional: callback when the entire text animation finishes
  useEffect(() => {
    if (isVisible && onAnimationComplete) {
      const totalAnimationTime = (letters.length - 1) * delay + 600; // Corresponds to animation duration
      const timer = setTimeout(() => {
        onAnimationComplete(text);
      }, totalAnimationTime);
      return () => clearTimeout(timer);
    }
  }, [isVisible, text, letters.length, delay, onAnimationComplete]);

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

// --- FeatureCard Component (Updated Design) ---
// Now accepts an onClick prop for navigation.
const FeatureCard = ({ titleLines, IconComponent, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative p-4 rounded-2xl h-36 w-36 sm:h-40 sm:w-40 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
  >
    {/* Glassmorphism background effect */}
    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl group-hover:bg-white/25 transition-colors duration-300"></div>
    
    {/* Content Container */}
    <div className="relative z-10 flex flex-col h-full">
      {/* Title text positioned at the top-left */}
      <div className="text-left">
        {titleLines.map((line, index) => (
          <h3 key={index} className="text-white font-bold text-base sm:text-lg leading-tight tracking-wide">
            {line}
          </h3>
        ))}
      </div>
      {/* Icon positioned at the bottom-right with reduced opacity */}
      <IconComponent className="absolute bottom-3 right-3 w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
    </div>
  </div>
);


// --- Placeholder Page Component ---
// A generic component to represent the different feature pages.
const PagePlaceholder = ({ title, onBack }) => (
    <div className="relative font-sans bg-[url('https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg')] bg-cover bg-center min-h-screen w-full flex flex-col items-center justify-center p-4 transition-opacity duration-500 animate-page-fade-in">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">{title}</h1>
            <button
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg backdrop-blur-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Back to Home
            </button>
        </div>
    </div>
);


// --- Main App (HomePage) Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageTitle, setPageTitle] = useState('');

  // Added 'page' key for navigation and 'title' for the placeholder page
  const featuresData = [
    { id: 1, titleLines: ["WEATHER"], Icon: TreeDeciduous, page: 'weather', title: 'Weather Information' },
    { id: 2, titleLines: ["SALE", "PRICE"], Icon: TreeDeciduous, page: 'sales', title: 'Sale Price Analysis' },
    { id: 3, titleLines: ["SOIL", "ANALYSIS"], Icon: TreeDeciduous, page: 'soil', title: 'Soil Analysis' },
    { id: 4, titleLines: ["TALK", "W/ AI"], Icon: TreeDeciduous, page: 'ai', title: 'Talk with AI Assistant' },
  ];

  const navigateTo = (page, title) => {
    setPageTitle(title);
    setCurrentPage(page);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const handleAnimationComplete = (lineText) => {
    console.log(`Animation for "${lineText}" has completed!`);
  };

  const commonTextStyle = "text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2";

  // Render the correct page based on the 'currentPage' state
  if (currentPage !== 'home') {
      return <PagePlaceholder title={pageTitle} onBack={() => navigateTo('home', '')} />;
  }

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes page-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-page-fade-in {
            animation: page-fade-in 0.5s ease-in-out forwards;
        }
      `}</style>
      <div className="relative font-sans bg-[url('https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center p-4">
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Main container with a single-column, centered layout */}
        <div className="relative z-10 container mx-auto flex flex-col items-start justify-center w-full max-w-md h-full p-4 sm:p-6">
          
          {/* Greeting and Title Text Section */}
          <div className="flex flex-col w-full mb-10">
            <SplitText
              text={greeting}
              className={commonTextStyle}
              delay={50}
              onAnimationComplete={() => handleAnimationComplete(greeting)}
            />
            <SplitText
              text="Let's talk about"
              className={commonTextStyle}
              delay={50}
              onAnimationComplete={() => handleAnimationComplete("Let's talk about")}
            />
            <SplitText
              text="your farm..."
              className={commonTextStyle}
              delay={80}
              onAnimationComplete={() => handleAnimationComplete("your farm...")}
            />
          </div>

          {/* Feature Cards Section */}
          <div className="w-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {featuresData.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  titleLines={feature.titleLines}
                  IconComponent={feature.Icon}
                  onClick={() => navigateTo(feature.page, feature.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
