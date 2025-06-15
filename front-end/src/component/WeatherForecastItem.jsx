import React from 'react';

const WeatherForecastItem = ({ day, Icon, temp, low }) => {
  return (
    <div className="flex items-center justify-between w-full text-white py-3 text-lg font-medium">
      <p className="flex-1">{day}</p>
      <div className="flex items-center gap-2">
        <Icon size={28} className="text-white/80" />
      </div>
      <p className="flex-1 text-right">{temp}°F / {low}°F</p>
    </div>
  );
};

export default WeatherForecastItem;