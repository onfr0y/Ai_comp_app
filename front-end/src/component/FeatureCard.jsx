import React from 'react';
import { TreeDeciduous } from 'lucide-react'; // Example icon, install lucide-react

// FeatureCard Component: Represents each individual card in the grid
const FeatureCard = ({ titleLines, IconComponent }) => {
  return (

    <div className="group relative flex aspect-square w-36 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/20 bg-gray-800/30 p-4 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:bg-gray-700/40 sm:w-40 sm:p-5">
      {/* Text Content - positioned at the top-left of the card */}
      <div className="z-10">
        {titleLines.map((line, index) => (
          <span
            key={index}

            className="block text-lg font-bold leading-tight text-white text-opacity-90 group-hover:text-opacity-100 sm:text-xl"
          >
            {line.toUpperCase()} {/* Ensure text is uppercase as in the image */}
          </span>
        ))}
      </div>

      {/* Icon - positioned at the bottom right, large and decorative */}
      {IconComponent && (
        <div 
            className="absolute bottom-1 right-1 z-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30 sm:bottom-2 sm:right-2 sm:h-20 sm:w-20"
        >
          {/* Renders the Lucide icon. The color and size are controlled by the parent div's Tailwind classes. */}
          <IconComponent className="h-full w-full text-white" />
        </div>
      )}
    </div>




  );
};

export default FeatureCard;
