'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, ThermometerSun, Droplets, Sun, CloudRain, Cloud, Snowflake, Loader2, CloudLightning } from 'lucide-react';

export const WeatherFeature = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [locationName, setLocationName] = useState('');
  
  useEffect(() => {
    // Attempt auto-detect on load
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        try {
          // Fetch real location name via reverse geocoding using Nominatim
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, {
            headers: { 'Accept-Language': 'en-US,en;q=0.9' }
          });
          const geoData = await geoRes.json();
          
          const addr = geoData.address || {};
          const city = addr.city || addr.town || addr.village || addr.county;
          const state = addr.state;
          const country = addr.country;
          
          const components = [city, state, country].filter(Boolean);
          const name = components.length > 0 ? components.join(', ') : 'Your Location';
          
          setSearchQuery(name); // Populate search box
          fetchWeatherByCoords(lat, lon, name);
        } catch (err) {
          setSearchQuery("Your Location");
          fetchWeatherByCoords(lat, lon, "Your Location");
        }
      }, () => {
        // Fallback or ignore
      });
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data);
      setLocationName(name);
    } catch (err) {
      setError("Unable to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        setError("Location not found.");
        setLoading(false);
        return;
      }

      const location = geoData.results[0];
      const name = `${location.name}, ${location.admin1 ? location.admin1 + ', ' : ''}${location.country}`;
      await fetchWeatherByCoords(location.latitude, location.longitude, name);
    } catch (err) {
      setError("Search failed.");
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number, className = "w-6 h-6") => {
    if (code === 0) return <Sun className={`${className} text-amber-500`} />;
    if (code <= 3) return <Cloud className={`${className} text-slate-400`} />;
    if (code <= 69) return <CloudRain className={`${className} text-blue-500`} />;
    if (code <= 79) return <Snowflake className={`${className} text-sky-400`} />;
    if (code <= 99) return <CloudLightning className={`${className} text-indigo-500`} />;
    return <Cloud className={`${className} text-slate-400`} />;
  };

  const getWeatherDesc = (code: number) => {
    if (code === 0) return 'Clear sky';
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 69) return 'Rain / Drizzle';
    if (code >= 71 && code <= 79) return 'Snow fall';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Overcast';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city, state, or country..."
          className="block w-full pl-12 pr-32 py-4 liquid-glass-surface border border-slate-200/80 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={loading || !searchQuery.trim()}
          className="absolute inset-y-2 right-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="space-y-6">
          {/* Main Weather Card */}
          <div className="liquid-glass-surface p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
              {getWeatherIcon(weather.current.weather_code, "w-64 h-64")}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-600 mb-6">
                <MapPin className="w-5 h-5" />
                <h2 className="text-lg font-bold">{locationName}</h2>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white/60 p-4 rounded-2xl border border-white">
                    {getWeatherIcon(weather.current.weather_code, "w-16 h-16")}
                  </div>
                  <div>
                    <div className="text-6xl font-extrabold text-slate-900 tracking-tighter">
                      {Math.round(weather.current.temperature_2m)}°
                    </div>
                    <div className="text-xl font-medium text-slate-500 mt-1">
                      {getWeatherDesc(weather.current.weather_code)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Feels Like</span>
                    <span className="text-lg font-bold text-slate-700 flex items-center gap-1">
                      <ThermometerSun className="w-4 h-4 text-orange-500" />
                      {Math.round(weather.current.apparent_temperature)}°
                    </span>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wind</span>
                    <span className="text-lg font-bold text-slate-700 flex items-center gap-1">
                      <Wind className="w-4 h-4 text-teal-500" />
                      {weather.current.wind_speed_10m} km/h
                    </span>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Humidity</span>
                    <span className="text-lg font-bold text-slate-700 flex items-center gap-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      {weather.current.relative_humidity_2m}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weather.daily.time.slice(1, 5).map((date: string, i: number) => {
              const dateObj = new Date(date);
              const dayName = i === 0 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
              
              return (
                <div key={date} className="bg-white/60 p-5 rounded-2xl border border-slate-200/60 flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1">
                  <span className="text-sm font-bold text-slate-500">{dayName}</span>
                  {getWeatherIcon(weather.daily.weather_code[i+1], "w-8 h-8")}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{Math.round(weather.daily.temperature_2m_max[i+1])}°</span>
                    <span className="text-sm font-medium text-slate-400">{Math.round(weather.daily.temperature_2m_min[i+1])}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
