import React from 'react';
import { TreeDeciduous } from 'lucide-react'; // Example icon, install lucide-react

// FeatureCard Component: Represents each individual card in the grid
const FeatureCard = ({ titleLines, IconComponent }) => {
  return (
    <div className="group relative flex aspect-square w-36 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-lg transition-colors duration-300 hover:bg-white/20 sm:w-40 sm:p-5">
      {/* Text Content - positioned above the icon */}
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

      {/* Icon - positioned at the bottom right, decorative */}
      {IconComponent && (
        <div className="absolute bottom-1 right-1 z-0 sm:bottom-2 sm:right-2">
          <IconComponent className="h-14 w-14 text-white/20 transition-colors duration-300 group-hover:text-white/30 sm:h-16 sm:w-16" />
        </div>
      )}
    </div>
  );
};

// Main App Component: Renders the grid of FeatureCards
export default FeatureCard;
 