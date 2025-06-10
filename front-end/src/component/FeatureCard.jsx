import React from 'react';
import { TreeDeciduous } from 'lucide-react'; // Example icon, install lucide-react

// FeatureCard Component: Represents each individual card in the grid
const FeatureCard = ({ titleLines, IconComponent }) => {
  return (
    // The main container for the card, with styling for its appearance and hover effects.
    // - group: Enables group-hover utilities for child elements.
    // - relative: Allows absolute positioning of child elements (like the icon).
    // - flex, flex-col, items-start, justify-start: Arranges content from top-left.
    // - aspect-square, w-36/sm:w-40: Sets the card to a square aspect ratio with responsive width.
    // - overflow-hidden: Clips content that overflows, useful for background icon.
    // - rounded-3xl: Adds pronounced rounded corners.
    // - border border-white/20: Creates a subtle white border with low opacity.
    // - bg-gray-800/30: Sets a dark, semi-transparent background (darker than previous white/10).
    // - p-4/sm:p-5: Adds internal padding.
    // - shadow-xl: Provides a strong shadow for depth.
    // - backdrop-blur-xl: Applies a significant blur effect to content behind the card, enhancing the frosted glass look.
    // - transition-colors duration-300: Smooth transition for background color on hover.
    // - hover:bg-gray-700/40: Darker, slightly more opaque background on hover.
    <div className="group relative flex aspect-square w-36 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/20 bg-gray-800/30 p-4 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:bg-gray-700/40 sm:w-40 sm:p-5">
      {/* Text Content - positioned at the top-left of the card */}
      <div className="z-10">
        {titleLines.map((line, index) => (
          <span
            key={index}
            // block: Ensures each line takes full width and stacks vertically.
            // text-lg/sm:text-xl: Sets responsive text size.
            // font-bold: Makes the text bold.
            // leading-tight: Reduces line height for a more compact look.
            // text-white text-opacity-90: White text with high initial opacity.
            // group-hover:text-opacity-100: Text becomes fully opaque on card hover.
            className="block text-lg font-bold leading-tight text-white text-opacity-90 group-hover:text-opacity-100 sm:text-xl"
          >
            {line.toUpperCase()} {/* Ensure text is uppercase as in the image */}
          </span>
        ))}
      </div>

      {/* Icon - positioned at the bottom right, large and decorative */}
      {IconComponent && (
        <div 
            // absolute: Positions the icon relative to the parent card.
            // bottom-1 right-1/sm:bottom-2 sm:right-2: Positions the icon in the bottom-right corner.
            // z-0: Ensures the icon is behind the text content.
            // opacity-20/group-hover:opacity-30: Controls the icon's transparency, making it subtle and a background element.
            // h-16 w-16/sm:h-20 sm:w-20: Increases the icon size to be more prominent.
            // text-white: Sets the icon color to white.
            // transition-opacity duration-300: Smooth transition for icon opacity on hover.
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
