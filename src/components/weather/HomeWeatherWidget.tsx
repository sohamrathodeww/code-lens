'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';

export const HomeWeatherWidget = () => {
  const [weather, setWeather] = useState<{ temp: number; desc: string; isDay: boolean; code: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            // Reverse Geocoding via Nominatim
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
            const geoData = await geoRes.json();
            const addr = geoData.address || {};
            setLocationName(addr.city || addr.town || addr.village || addr.county || 'Local Area');

            // Open-Meteo Weather
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`);
            const weatherData = await weatherRes.json();
            const current = weatherData.current;
            
            setWeather({
              temp: Math.round(current.temperature_2m),
              desc: getWeatherDesc(current.weather_code),
              isDay: current.is_day === 1,
              code: current.weather_code
            });
          } catch (e) {
            setError(true);
          } finally {
            setLoading(false);
          }
        },
        () => {
          // Denied or error
          setError(true);
          setLoading(false);
        }
      );
    }
  }, []);

  const getWeatherDesc = (code: number) => {
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 49) return 'Foggy';
    if (code <= 69) return 'Rainy';
    if (code <= 79) return 'Snowy';
    if (code <= 99) return 'Stormy';
    return 'Cloudy';
  };

  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0) return <Sun className="w-4 h-4 text-amber-500" />;
    if (code <= 3) return <Cloud className="w-4 h-4 text-slate-400" />;
    if (code <= 69) return <CloudRain className="w-4 h-4 text-blue-500" />;
    if (code <= 79) return <Snowflake className="w-4 h-4 text-sky-400" />;
    return <Cloud className="w-4 h-4 text-slate-400" />;
  };

  if (error || !weather && !loading) return null;

  return (
    <Link href="/weather" className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group">
      {loading ? (
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Detecting Local Weather...</span>
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold">{locationName}</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            {getWeatherIcon(weather.code, weather.isDay)}
            <span className="text-xs font-bold">{weather.temp}°C • {weather.desc}</span>
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-indigo-500 font-bold ml-1">Open Full Radar</span>
        </>
      ) : null}
    </Link>
  );
};

