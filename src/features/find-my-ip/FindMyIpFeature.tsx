'use client';

import React, { useEffect, useState } from 'react';
import { Network, MapPin, Globe, Server, Shield, Loader2, Copy, Check } from 'lucide-react';

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  org: string;
  asn: string;
}

export const FindMyIpFeature = () => {
  const [ipData, setIpData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchIpInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('Failed to fetch IP data');
      const data = await res.json();
      setIpData(data);
    } catch (err) {
      setError('Could not retrieve IP address. Please check your connection or ad blocker.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  const copyToClipboard = () => {
    if (ipData?.ip) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="liquid-glass-surface p-8 rounded-3xl border border-white dark:border-slate-700/80 dark:border-slate-700/80 shadow-sm relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">Detecting your IP details...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center">
            <Shield className="w-12 h-12 text-rose-500" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-300">Connection Error</h3>
            <p className="text-slate-500 dark:text-slate-400">{error}</p>
            <button 
              onClick={fetchIpInfo}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors mt-4"
            >
              Try Again
            </button>
          </div>
        ) : ipData ? (
          <div className="space-y-12">
            {/* Main IP Display */}
            <div className="text-center space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Your Public IP Address</h2>
              <div className="flex items-center justify-center gap-4">
                <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-100 drop-shadow-sm font-mono">
                  {ipData.ip}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:bg-indigo-500/10 hover:border-indigo-200 hover:text-indigo-600 dark:text-indigo-400 transition-all shadow-sm"
                  title="Copy IP Address"
                >
                  {copied ? <Check className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6 text-slate-400" />}
                </button>
              </div>
            </div>

            {/* Grid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location Card */}
              <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-300 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {ipData.city ? `${ipData.city}, ${ipData.region}` : 'Unknown'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {ipData.country_name} {ipData.postal && `(${ipData.postal})`}
                  </p>
                </div>
              </div>

              {/* ISP Card */}
              <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">ISP / Organization</h3>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-1" title={ipData.org}>
                    {ipData.org || 'Unknown'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {ipData.asn || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Coordinates Card */}
              <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Coordinates</h3>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 font-mono">
                    {ipData.latitude}, {ipData.longitude}
                  </p>
                </div>
              </div>

              {/* Network Details Card */}
              <div className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Network Type</h3>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {ipData.ip.includes(':') ? 'IPv6' : 'IPv4'} Protocol
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};







