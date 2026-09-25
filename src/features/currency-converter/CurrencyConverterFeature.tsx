"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowRightLeft, Banknote, RefreshCw, AlertCircle, Globe, TrendingUp, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SlideUp, FadeIn, ScaleIn } from "@/components/motion/MotionPrimitives";

// Comprehensive world currencies mapping
const COMMON_CURRENCIES: Record<string, { name: string; symbol: string }> = {
  USD: { name: "US Dollar", symbol: "$" },
  EUR: { name: "Euro", symbol: "€" },
  GBP: { name: "British Pound", symbol: "£" },
  JPY: { name: "Japanese Yen", symbol: "¥" },
  AUD: { name: "Australian Dollar", symbol: "A$" },
  CAD: { name: "Canadian Dollar", symbol: "C$" },
  CHF: { name: "Swiss Franc", symbol: "CHF" },
  CNY: { name: "Chinese Yuan", symbol: "¥" },
  INR: { name: "Indian Rupee", symbol: "₹" },
  SGD: { name: "Singapore Dollar", symbol: "S$" },
  AED: { name: "UAE Dirham", symbol: "د.إ" },
  ZAR: { name: "South African Rand", symbol: "R" },
  BRL: { name: "Brazilian Real", symbol: "R$" },
  MXN: { name: "Mexican Peso", symbol: "$" },
  AFN: { name: "Afghan Afghani", symbol: "؋" },
  ALL: { name: "Albanian Lek", symbol: "L" },
  AMD: { name: "Armenian Dram", symbol: "֏" },
  ANG: { name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  AOA: { name: "Angolan Kwanza", symbol: "Kz" },
  ARS: { name: "Argentine Peso", symbol: "$" },
  AWG: { name: "Aruban Florin", symbol: "ƒ" },
  AZN: { name: "Azerbaijani Manat", symbol: "₼" },
  BAM: { name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  BBD: { name: "Barbadian Dollar", symbol: "$" },
  BDT: { name: "Bangladeshi Taka", symbol: "৳" },
  BGN: { name: "Bulgarian Lev", symbol: "лв" },
  BHD: { name: "Bahraini Dinar", symbol: ".د.ب" },
  BIF: { name: "Burundian Franc", symbol: "FBu" },
  BMD: { name: "Bermudan Dollar", symbol: "$" },
  BND: { name: "Brunei Dollar", symbol: "$" },
  BOB: { name: "Bolivian Boliviano", symbol: "Bs." },
  BSD: { name: "Bahamian Dollar", symbol: "$" },
  BTN: { name: "Bhutanese Ngultrum", symbol: "Nu." },
  BWP: { name: "Botswanan Pula", symbol: "P" },
  BYN: { name: "Belarusian Ruble", symbol: "Br" },
  BZD: { name: "Belize Dollar", symbol: "BZ$" },
  CDF: { name: "Congolese Franc", symbol: "FC" },
  CLP: { name: "Chilean Peso", symbol: "$" },
  COP: { name: "Colombian Peso", symbol: "$" },
  CRC: { name: "Costa Rican Colón", symbol: "₡" },
  CUP: { name: "Cuban Peso", symbol: "₱" },
  CVE: { name: "Cape Verdean Escudo", symbol: "$" },
  CZK: { name: "Czech Koruna", symbol: "Kč" },
  DJF: { name: "Djiboutian Franc", symbol: "Fdj" },
  DKK: { name: "Danish Krone", symbol: "kr" },
  DOP: { name: "Dominican Peso", symbol: "RD$" },
  DZD: { name: "Algerian Dinar", symbol: "د.ج" },
  EGP: { name: "Egyptian Pound", symbol: "£" },
  ERN: { name: "Eritrean Nakfa", symbol: "Nfk" },
  ETB: { name: "Ethiopian Birr", symbol: "Br" },
  FJD: { name: "Fijian Dollar", symbol: "$" },
  FKP: { name: "Falkland Islands Pound", symbol: "£" },
  FOK: { name: "Faroese Króna", symbol: "kr" },
  GEL: { name: "Georgian Lari", symbol: "₾" },
  GGP: { name: "Guernsey Pound", symbol: "£" },
  GHS: { name: "Ghanaian Cedi", symbol: "GH₵" },
  GIP: { name: "Gibraltar Pound", symbol: "£" },
  GMD: { name: "Gambian Dalasi", symbol: "D" },
  GNF: { name: "Guinean Franc", symbol: "FG" },
  GTQ: { name: "Guatemalan Quetzal", symbol: "Q" },
  GYD: { name: "Guyanaese Dollar", symbol: "$" },
  HKD: { name: "Hong Kong Dollar", symbol: "HK$" },
  HNL: { name: "Honduran Lempira", symbol: "L" },
  HRK: { name: "Croatian Kuna", symbol: "kn" },
  HTG: { name: "Haitian Gourde", symbol: "G" },
  HUF: { name: "Hungarian Forint", symbol: "Ft" },
  IDR: { name: "Indonesian Rupiah", symbol: "Rp" },
  ILS: { name: "Israeli New Shekel", symbol: "₪" },
  IMP: { name: "Manx pound", symbol: "£" },
  IQD: { name: "Iraqi Dinar", symbol: "ع.د" },
  IRR: { name: "Iranian Rial", symbol: "﷼" },
  ISK: { name: "Icelandic Króna", symbol: "kr" },
  JEP: { name: "Jersey Pound", symbol: "£" },
  JMD: { name: "Jamaican Dollar", symbol: "J$" },
  JOD: { name: "Jordanian Dinar", symbol: "د.ا" },
  KES: { name: "Kenyan Shilling", symbol: "KSh" },
  KGS: { name: "Kyrgystani Som", symbol: "с" },
  KHR: { name: "Cambodian Riel", symbol: "៛" },
  KID: { name: "Kiribati Dollar", symbol: "$" },
  KMF: { name: "Comorian Franc", symbol: "CF" },
  KRW: { name: "South Korean Won", symbol: "₩" },
  KWD: { name: "Kuwaiti Dinar", symbol: "د.ك" },
  KYD: { name: "Cayman Islands Dollar", symbol: "$" },
  KZT: { name: "Kazakhstani Tenge", symbol: "₸" },
  LAK: { name: "Laotian Kip", symbol: "₭" },
  LBP: { name: "Lebanese Pound", symbol: "ل.ل" },
  LKR: { name: "Sri Lankan Rupee", symbol: "Rs" },
  LRD: { name: "Liberian Dollar", symbol: "$" },
  LSL: { name: "Lesotho Loti", symbol: "L" },
  LYD: { name: "Libyan Dinar", symbol: "ل.د" },
  MAD: { name: "Moroccan Dirham", symbol: "د.م." },
  MDL: { name: "Moldovan Leu", symbol: "L" },
  MGA: { name: "Malagasy Ariary", symbol: "Ar" },
  MKD: { name: "Macedonian Denar", symbol: "ден" },
  MMK: { name: "Myanmar Kyat", symbol: "K" },
  MNT: { name: "Mongolian Tugrik", symbol: "₮" },
  MOP: { name: "Macanese Pataca", symbol: "P" },
  MRU: { name: "Mauritanian Ouguiya", symbol: "UM" },
  MUR: { name: "Mauritian Rupee", symbol: "₨" },
  MVR: { name: "Maldivian Rufiyaa", symbol: "Rf" },
  MWK: { name: "Malawian Kwacha", symbol: "MK" },
  MYR: { name: "Malaysian Ringgit", symbol: "RM" },
  MZN: { name: "Mozambican Metical", symbol: "MT" },
  NAD: { name: "Namibian Dollar", symbol: "$" },
  NGN: { name: "Nigerian Naira", symbol: "₦" },
  NIO: { name: "Nicaraguan Córdoba", symbol: "C$" },
  NOK: { name: "Norwegian Krone", symbol: "kr" },
  NPR: { name: "Nepalese Rupee", symbol: "₨" },
  NZD: { name: "New Zealand Dollar", symbol: "$" },
  OMR: { name: "Omani Rial", symbol: "ر.ع." },
  PAB: { name: "Panamanian Balboa", symbol: "B/." },
  PEN: { name: "Peruvian Sol", symbol: "S/." },
  PGK: { name: "Papua New Guinean Kina", symbol: "K" },
  PHP: { name: "Philippine Peso", symbol: "₱" },
  PKR: { name: "Pakistani Rupee", symbol: "₨" },
  PLN: { name: "Polish Zloty", symbol: "zł" },
  PYG: { name: "Paraguayan Guarani", symbol: "₲" },
  QAR: { name: "Qatari Rial", symbol: "ر.ق" },
  RON: { name: "Romanian Leu", symbol: "lei" },
  RSD: { name: "Serbian Dinar", symbol: "дин." },
  RUB: { name: "Russian Ruble", symbol: "₽" },
  RWF: { name: "Rwandan Franc", symbol: "FRw" },
  SAR: { name: "Saudi Riyal", symbol: "ر.س" },
  SBD: { name: "Solomon Islands Dollar", symbol: "$" },
  SCR: { name: "Seychellois Rupee", symbol: "₨" },
  SDG: { name: "Sudanese Pound", symbol: "ج.س." },
  SEK: { name: "Swedish Krona", symbol: "kr" },
  SHP: { name: "Saint Helena Pound", symbol: "£" },
  SLE: { name: "Sierra Leonean Leone", symbol: "Le" },
  SOS: { name: "Somali Shilling", symbol: "Sh" },
  SRD: { name: "Surinamese Dollar", symbol: "$" },
  SSP: { name: "South Sudanese Pound", symbol: "£" },
  STN: { name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  SYP: { name: "Syrian Pound", symbol: "£" },
  SZL: { name: "Swazi Lilangeni", symbol: "L" },
  THB: { name: "Thai Baht", symbol: "฿" },
  TJS: { name: "Tajikistani Somoni", symbol: "ЅМ" },
  TMT: { name: "Turkmenistani Manat", symbol: "T" },
  TND: { name: "Tunisian Dinar", symbol: "د.ت" },
  TOP: { name: "Tongan Pa'anga", symbol: "T$" },
  TRY: { name: "Turkish Lira", symbol: "₺" },
  TTD: { name: "Trinidad and Tobago Dollar", symbol: "TT$" },
  TVD: { name: "Tuvaluan Dollar", symbol: "$" },
  TWD: { name: "New Taiwan Dollar", symbol: "NT$" },
  TZS: { name: "Tanzanian Shilling", symbol: "Sh" },
  UAH: { name: "Ukrainian Hryvnia", symbol: "₴" },
  UGX: { name: "Ugandan Shilling", symbol: "USh" },
  UYU: { name: "Uruguayan Peso", symbol: "$U" },
  UZS: { name: "Uzbekistan Som", symbol: "so'm" },
  VES: { name: "Venezuelan Bolívar Soberano", symbol: "Bs.S." },
  VND: { name: "Vietnamese Dong", symbol: "₫" },
  VUV: { name: "Vanuatu Vatu", symbol: "VT" },
  WST: { name: "Samoan Tala", symbol: "T" },
  XAF: { name: "CFA Franc BEAC", symbol: "FCFA" },
  XCD: { name: "East Caribbean Dollar", symbol: "$" },
  XDR: { name: "Special Drawing Rights", symbol: "SDR" },
  XOF: { name: "CFA Franc BCEAO", symbol: "CFA" },
  XPF: { name: "CFP Franc", symbol: "₣" },
  YER: { name: "Yemeni Rial", symbol: "﷼" },
  ZMW: { name: "Zambian Kwacha", symbol: "ZK" },
  ZWL: { name: "Zimbabwean Dollar", symbol: "Z$" },
};

const CustomCurrencySelect = ({ 
  value, 
  onChange, 
  options 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: string[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const label = COMMON_CURRENCIES[opt] ? `${opt} - ${COMMON_CURRENCIES[opt].name}` : opt;
      return label.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [options, searchQuery]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery("");
        }}
        className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold rounded-xl py-2 pl-4 pr-3 hover:bg-slate-800 transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-slate-900/20"
      >
        <span>
          {COMMON_CURRENCIES[value] ? `${value} - ${COMMON_CURRENCIES[value].name}` : value}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-[0_12px_40px_rgba(15,23,42,0.15)] rounded-2xl z-50 overflow-hidden flex flex-col">
            
            <div className="p-2 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 overflow-hidden">
                <Search className="absolute left-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search currency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-2 pl-8 pr-3 text-sm font-semibold text-slate-800 dark:text-slate-300 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                  No currencies found
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl transition-all mb-0.5 last:mb-0 ${
                      value === opt 
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-800/50"
                    }`}
                  >
                    <span>{opt} - {COMMON_CURRENCIES[opt]?.name || opt}</span>
                    {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const CurrencyConverterFeature: React.FC = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchRates = async (base: string) => {
    setLoading(true);
    setError(null);
    try {
      // Primary API: exchangerate-api public endpoint
      let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
      
      if (!response.ok) {
        // Fallback API: er-api
        response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates. Please try again later.");
      }

      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message || "Network error while fetching rates.");
      // Provide emergency fallback rates if completely offline
      if (!rates) {
        setRates({
          USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.5, AUD: 1.52, CAD: 1.35, INR: 83.1
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch rates whenever 'fromCurrency' changes
  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = useMemo(() => {
    if (!rates || !rates[toCurrency] || isNaN(Number(amount))) return "0.00";
    return (Number(amount) * rates[toCurrency]).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [amount, rates, toCurrency]);

  const exchangeRate = rates ? rates[toCurrency] : null;

  const getCurrencyLabel = (code: string) => {
    return COMMON_CURRENCIES[code] ? `${code} - ${COMMON_CURRENCIES[code].name}` : code;
  };

  const availableCurrencies = useMemo(() => {
    if (!rates) return Object.keys(COMMON_CURRENCIES);
    return Object.keys(rates);
  }, [rates]);

  return (
    <SlideUp className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="liquid-glass-surface px-6 py-4.5 sm:px-8 sm:py-5 flex items-center justify-between gap-4 relative">
        <span className="lens-sheen" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="p-2.5 rounded-2xl bg-indigo-600/10 border border-indigo-200/80 dark:border-indigo-500/20 text-indigo-600 dark:text-white ">
            <Banknote className="w-6 h-6 text-indigo-600 dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Currency Converter
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Real-time exchange rates for global fiat currencies
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-stretch">
        
        {/* Main Converter Card */}
        <div className="liquid-glass-surface p-6 sm:p-10 flex flex-col relative overflow-hidden">
          <span className="lens-sheen" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              
              {/* FROM Currency */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Amount</label>
                  <CustomCurrencySelect
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    options={availableCurrencies}
                  />
                </div>
                <div className="relative flex items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all">
                  <span className="pl-2 sm:pl-4 text-2xl sm:text-3xl font-bold text-slate-400">
                    {COMMON_CURRENCIES[fromCurrency]?.symbol || ""}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent border-none text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 focus:ring-0 px-3 py-2 outline-none placeholder:text-slate-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center pt-8 md:pt-10">
                <button
                  onClick={handleSwap}
                  className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-white hover:bg-indigo-600 hover:text-white border border-indigo-100 dark:border-indigo-500/20 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md group focus:outline-none"
                >
                  <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>

              {/* TO Currency */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Converted To</label>
                  <CustomCurrencySelect
                    value={toCurrency}
                    onChange={setToCurrency}
                    options={availableCurrencies}
                  />
                </div>
                <div className="relative flex items-center p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-inner overflow-hidden">
                  <span className="pl-2 sm:pl-4 text-2xl sm:text-3xl font-bold text-indigo-400">
                    {COMMON_CURRENCIES[toCurrency]?.symbol || ""}
                  </span>
                  <div className="w-full truncate px-3 py-2 text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-white">
                    {loading ? <span className="animate-pulse opacity-50">...</span> : convertedAmount}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200/60 dark:border-slate-700/60 gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
                ) : error ? (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                )}
                
                {error ? (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{error}</span>
                ) : exchangeRate ? (
                  <span>
                    1 <span className="font-bold text-slate-700 dark:text-slate-300">{fromCurrency}</span> = <span className="font-bold text-indigo-600 dark:text-white">{exchangeRate.toFixed(4)}</span> <span className="font-bold text-slate-700 dark:text-slate-300">{toCurrency}</span>
                  </span>
                ) : (
                  "Fetching exchange rates..."
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {lastUpdated ? `Last updated: ${lastUpdated}` : "Connecting to API..."}
                </span>
                <Button variant="secondary" size="sm" onClick={() => fetchRates(fromCurrency)} disabled={loading} className="text-[11px] h-7 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                  Refresh Rates
                </Button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-80 space-y-4 flex flex-col">
          <FadeIn delay={0.2} className="liquid-glass-surface p-6 flex-1 relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-500/100/10 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2" />
             <div className="flex items-center gap-3 mb-4 relative z-10">
               <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 text-emerald-600">
                 <Globe className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-slate-900 dark:text-slate-100">Live Global Rates</h3>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
               Exchange rates are pulled in real-time from our global financial API. We support over 150+ fiat currencies with an automatic fallback engine ensuring 99.9% uptime.
             </p>
             <div className="mt-6 space-y-3 relative z-10">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">EUR / USD</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-300">{rates ? (1 / rates["EUR"]).toFixed(4) : "..."}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">GBP / USD</span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-300">{rates ? (1 / rates["GBP"]).toFixed(4) : "..."}</span>
                </div>
             </div>
          </FadeIn>
        </div>
        
      </div>
    </SlideUp>
  );
};









