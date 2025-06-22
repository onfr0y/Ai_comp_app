import React from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherForecastItem from '../component/WeatherForecastItem.jsx';
import {
  Cloud,
  CloudRain,
  CloudLightning,
  Sun,
  Wind,
  Sunrise,
  Sunset,
  ArrowLeft
} from 'lucide-react';

const WeatherPage = () => {
  const navigate = useNavigate();

  //  placeholder until send it with the api jaa
  const dummyForecastData = [
    { day: 'Tuesday', Icon: CloudRain, temp: '71', low: '55' },
    { day: 'Wednesday', Icon: CloudLightning, temp: '68', low: '54' },
    { day: 'Thursday', Icon: Sun, temp: '75', low: '57' },
    { day: 'Friday', Icon: Wind, temp: '72', low: '59' },
    { day: 'Saturday', Icon: Sun, temp: '78', low: '60' },
    { day: 'Sunday', Icon: Sunrise, temp: '80', low: '62' },
    { day: 'Monday', Icon: Sunset, temp: '81', low: '63' },
  ];

  return (
    <div className='relative font-sans bg-[url("https://i.pinimg.com/736x/14/02/f6/1402f637aa06ebb18eaa8a70524247a8.jpg")] bg-cover bg-center min-h-screen w-full flex items-center justify-center p-4'>
      <div className="flex flex-col w-full max-w-md h-[85vh] bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-white/20">
            <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="text-center flex-grow">
                <h2 className="text-2xl font-bold text-white">Bangkok</h2>
                <p className="text-white/80">Partly Cloudy</p>
            </div>
            <div className='w-10'></div>
        </div>

        {/* Forecast List */}
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="flex flex-col divide-y divide-white/20">
            {dummyForecastData.map((item, index) => (
              <WeatherForecastItem
                key={index}
                day={item.day}
                Icon={item.Icon}
                temp={item.temp}
                low={item.low}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;