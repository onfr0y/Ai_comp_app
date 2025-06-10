import React from 'react';
import SplitText from '../component/SplitText';
import FeatureCard from '../component/FeatureCard';
import { TreeDeciduous } from 'lucide-react';

// Data for the feature cards
const featuresData = [
  { id: 1, titleLines: ["WEATHER"], Icon: TreeDeciduous },
  { id: 2, titleLines: ["SALE", "PRICE"], Icon: TreeDeciduous },
  { id: 3, titleLines: ["SOIL", "ANALYSIS"], Icon: TreeDeciduous },
  { id: 4, titleLines: ["TALK", "W/", "LLM"], Icon: TreeDeciduous },
];

function HomePage() {
  const handleAnimationComplete = (lineText) => {
    console.log(`Animation for "${lineText}" has completed!`);
  };

  // Common style for all lines
  const commonTextStyle = "text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2 sm:mb-3";

  // Common animation properties for each character animation
  const commonAnimationProps = {
    duration: 0.6,
    ease: "power3.out",
    splitType: "chars",
    from: { opacity: 0, y: 40, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1 },
    threshold: 0.1,
  };

  return (
    <>
      <div className="relative bg-[url('https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg')] bg-cover bg-center min-h-screen flex flex-col items-start justify-start p-8 sm:p-12 md:p-16">
        <div className="relative z-10">
          {/* Third Line */}
          <SplitText
            text="Let's talk about"
            className={commonTextStyle}
            delay={80}
            {...commonAnimationProps}
            onLetterAnimationComplete={() => handleAnimationComplete("Let's talk")}
          />

          {/* Fifth Line */}
          <SplitText
            text="  your  farm..."
            className={commonTextStyle}
            delay={100}
            {...commonAnimationProps}
            onLetterAnimationComplete={() => handleAnimationComplete("farm......")}
          />
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className=' grid '>
      <div className="grid max-w-xs grid-cols-2 gap-4 sm:max-w-sm sm:gap-5">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              titleLines={feature.titleLines}
              IconComponent={feature.Icon}
            />
          ))}
        </div>
      </div>
     
      
    </>
  );
}

export default HomePage;
