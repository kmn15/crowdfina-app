import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Share2, Facebook, Twitter, Linkedin, Instagram, Info, Bed, Bath, Car, Square } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

interface PropertyDetailProps {
  property?: {
    id: string;
    title: string;
    location: string;
    price: string;
    description: string;
    images: string[];
    details: {
      investmentType: string;
      profit: string;
      profitSchedule: string;
      profitBack: string;
      capitalBack: string;
      yearlyReturnRate: number;
      growthRate: number;
      investmentDuration: number;
      anticipatedMonthlyRent: number;
      distributedRevenuesAmount: number;
      propertyValue: number;
      minimumInvestmentAmount: number;
      bedrooms: number;
      bathrooms: number;
      parking: number;
      size: number;
    };
    investors: Array<{
      name: string;
      joinedDate: string;
      properties: number;
      nationality: string;
      avatar?: string;
    }>;
  };
}

export default function PropertyDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // This would typically come from an API call using the ID
  const property = {
    id: '1',
    title: 'Colbert',
    location: 'Colombes, FR',
    price: '€150,000.00',
    description: `Bel appartement bien situé à 2 pas de la Défense (15 min en tram) et 10 min à pied de la gare de Garenne-Colombes. Lumineux et fonctionnel.`,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1400&q=80',
    ],
    details: {
      investmentType: 'One-time',
      yearlyReturnRate: 6.39,
      growthRate: 1.5,
      investmentDuration: 4,
      anticipatedMonthlyRent: 850,
      distributedRevenuesAmount: 799,
      propertyValue: 150000,
      minimumInvestmentAmount: 10,
      profitSchedule: 'Monthly',
      profitBack: '4 years',
      capitalBack: 'Yes',
      bathrooms: 1,
      bedrooms: 2,
      parking: 1,
      size: 50
    },
    investors: [
      {
        name: 'Walter Cox',
        joinedDate: '2 months ago',
        properties: 4,
        nationality: 'Bangladesh',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ]
  };

  // Convert price string to number for calculations
  const propertyValueNumber = property.details.propertyValue;
  
  // Update the initial state to allow empty value
  const [rangeValue, setRangeValue] = useState<number | ''>(property.details.minimumInvestmentAmount || 10);
  
  // Calculate distributed revenues (annual)
  const distributedSum = property.details.distributedRevenuesAmount * 12;
  
  // Calculate the minimum share average as a percentage
  const minShareAvg = ((rangeValue / property.details.propertyValue) * 100).toFixed(2);
  
  // Calculate expected cash flow based on the share percentage
  const cashflow = ((parseFloat(minShareAvg) / 100) * distributedSum).toFixed(2);
  
  // Calculate profits over the investment duration
  const [durationProfit, setDurationProfit] = useState(
    parseFloat(cashflow) * property.details.investmentDuration
  );
  
  // Calculate profit percentage over the investment duration
  const [durationProfitAvg, setDurationProfitAvg] = useState(
    ((parseFloat(cashflow) * property.details.investmentDuration) / rangeValue) * 100
  );
  
  // Calculate monthly profits
  const [monthlyProfit, setMonthlyProfit] = useState(parseFloat(cashflow) * (1 / 12));
  
  // Calculate monthly profit percentage
  const [monthlyProfitAvg, setMonthlyProfitAvg] = useState(
    ((parseFloat(cashflow) * (1 / 12)) / rangeValue) * 100
  );

  // Add tooltip state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Tooltip content
  const tooltips = {
    cashFlow: "Expected cash flow represents the total rental income you'll receive over the 4-year investment period after all expenses and fees.",
    monthlyProfit: "Monthly fixed profitability shows your expected monthly rental income based on your investment amount.",
    totalGain: "Expected total gain combines both rental income and potential property value appreciation over the 4-year investment period.",
    finalValue: "The final value represents your initial investment plus all expected gains at the end of the 4-year investment period.",
    slider: `Investment range: €${property.details.minimumInvestmentAmount.toLocaleString()} - €${property.details.propertyValue.toLocaleString()}`,
    expectedCapitalGain: "Expected Capital Gain: The anticipated gain from property appreciation (1.5% annual growth rate) over the 4-year investment period."
  };

  // Calculate slider percentage for styling
  const sliderPercentage = ((rangeValue - property.details.minimumInvestmentAmount) / (property.details.propertyValue - property.details.minimumInvestmentAmount)) * 100;

  // Helper functions for calculations
  function calculateExpectedGain(initialValue: number, growthRatePercent: number, years: number) {
    const growthRate = growthRatePercent / 100;
    return initialValue * growthRate * years;
  }

  function calculateExpectedTotalGain(
    initialValue: number,
    growthRatePercent: number,
    years: number,
    durationProfit: number
  ) {
    const growthRate = growthRatePercent / 100;
    const gain = initialValue * growthRate * years;
    return gain + durationProfit;
  }

  function calculateInvestmentFinalValue(
    initialValue: number,
    growthRatePercent: number,
    years: number,
    durationProfit: number
  ) {
    const growthRate = growthRatePercent / 100;
    const gain = initialValue * growthRate * years;
    return gain + durationProfit + initialValue;
  }

  // Update handleInputChange to allow empty value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty value
    if (value === '') {
      setRangeValue('');
      return;
    }

    const numValue = Number(value);
    
    // Only clamp on blur, but prevent values above max
    if (numValue > property.details.propertyValue) {
      updateInvestmentAmount(property.details.propertyValue);
    } else {
      updateInvestmentAmount(numValue);
    }
  };

  // Add onBlur handler to enforce minimum value
  const handleInputBlur = () => {
    if (rangeValue === '' || Number(rangeValue) < property.details.minimumInvestmentAmount) {
      updateInvestmentAmount(property.details.minimumInvestmentAmount);
    }
  };

  // Common function to update all calculations
  const updateInvestmentAmount = (value: number | '') => {
    setRangeValue(value);

    // Skip calculations if value is empty
    if (value === '') return;

    // Recalculate values when range changes
    const newMinShareAvg = ((value / property.details.propertyValue) * 100).toFixed(2);
    const newCashflow = ((parseFloat(newMinShareAvg) / 100) * distributedSum).toFixed(2);
    
    const newDurationProfit = parseFloat(newCashflow) * property.details.investmentDuration;
    const newDurationProfitAvg = ((parseFloat(newCashflow) * property.details.investmentDuration) / value) * 100;
    const newMonthlyProfit = parseFloat(newCashflow) * (1 / 12);
    const newMonthlyProfitAvg = ((parseFloat(newCashflow) * (1 / 12)) / value) * 100;
    
    setDurationProfit(newDurationProfit);
    setDurationProfitAvg(newDurationProfitAvg);
    setMonthlyProfit(newMonthlyProfit);
    setMonthlyProfitAvg(newMonthlyProfitAvg);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <Link to="/properties" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span>{t('properties.propertyDetails.back')}</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Image Slider */}
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-[400px] object-cover"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 flex gap-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Property Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('properties.propertyDetails.propertyValue')}</p>
                    <p className="text-2xl font-bold text-gray-900">€{property.details.propertyValue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Add the new property specs section here */}
                <div className="flex items-center gap-6 mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.details.bedrooms} {t('properties.propertyDetails.bedrooms')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.details.bathrooms} {t('properties.propertyDetails.bathrooms')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.details.parking} {t('properties.propertyDetails.parking')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{t('properties.propertyDetails.size')} {property.details.size} {t('properties.propertyDetails.squareMeters')}</span>
                  </div>
                </div>

                {/* Investment Details */}
                <div className="border-t border-b border-gray-200 py-6 my-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.investmentType')}</p>
                      <p className="font-semibold">{property.details.investmentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.yearlyReturnRate')}</p>
                      <p className="font-semibold">{property.details.yearlyReturnRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.growthRate')}</p>
                      <p className="font-semibold">{property.details.growthRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.investmentDuration')}</p>
                      <p className="font-semibold">{property.details.investmentDuration} {t('properties.propertyDetails.years')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.monthlyRent')}</p>
                      <p className="font-semibold">€{property.details.anticipatedMonthlyRent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.minimumInvestment')}</p>
                      <p className="font-semibold">€{property.details.minimumInvestmentAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">{t('properties.propertyDetails.description')}</h3>
                  <div className="text-gray-600 space-y-4">
                    {property.description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Location</h3>
                  <div className="h-[300px] bg-gray-100 rounded-lg">
                    {/* Add your map component here */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948534!3d37.75781499623725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1521163250894"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Project Calendar */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Project Calendar</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold">April 2025</h4>
                      <p className="text-sm text-gray-600">Fundraising Start</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold">July 2025</h4>
                      <p className="text-sm text-gray-600">Fundraising End</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold">August 2025</h4>
                      <p className="text-sm text-gray-600">First Revenue</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold">April 2030</h4>
                      <p className="text-sm text-gray-600">End of Contract</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Investment Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Revenue Estimator Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {t('properties.propertyDetails.revenueEstimator')}
                </h3>
                
                {/* Investment Amount Input */}
                <div className="mb-4">
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('properties.propertyDetails.investmentAmount')} (€)
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                      <input
                        type="number"
                        id="investmentAmount"
                        value={rangeValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        max={property.details.propertyValue}
                        step={1000}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                      />
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      Min: €{property.details.minimumInvestmentAmount.toLocaleString()} | Max: €{property.details.propertyValue.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {/* Slider with visual feedback */}
                <div className="relative mb-6">
                  <div 
                    className="absolute -top-8 left-0 text-sm text-gray-500 w-full text-center"
                    onMouseEnter={() => setActiveTooltip('slider')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {activeTooltip === 'slider' && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap">
                        {tooltips.slider}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute h-2 bg-orange-500 rounded-l-lg" 
                      style={{ width: `${sliderPercentage}%` }} 
                    />
                    <input
                      type="range"
                      value={rangeValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      min={property.details.minimumInvestmentAmount}
                      max={property.details.propertyValue}
                      step={1000}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer relative z-10"
                      style={{
                        background: 'transparent',
                        WebkitAppearance: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Expected Cash Flow */}
                <div className="mt-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">
                      {t('properties.propertyDetails.expectedCashFlow', { years: property.details.investmentDuration })}
                    </p>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setActiveTooltip('cashFlow')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {activeTooltip === 'cashFlow' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-1 rounded text-xs max-w-xs z-50">
                          {t('properties.propertyDetails.tooltips.cashFlow')}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        +€{durationProfit.toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                      <span className="text-green-500">
                        +{durationProfitAvg.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Fixed Profitability */}
                <div className="mt-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">{t('properties.propertyDetails.monthlyFixedProfitability')}</p>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setActiveTooltip('monthlyProfit')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {activeTooltip === 'monthlyProfit' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-1 rounded text-xs max-w-xs z-50">
                          {t('properties.propertyDetails.tooltips.monthlyProfit')}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        +€{monthlyProfit.toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                      <span className="text-green-500">
                        +{monthlyProfitAvg.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expected Capital Gain */}
                <div className="mt-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">{t('properties.propertyDetails.expectedCapitalGain')}</p>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setActiveTooltip('expectedCapitalGain')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {activeTooltip === 'expectedCapitalGain' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-1 rounded text-xs max-w-xs z-50">
                          {t('properties.propertyDetails.tooltips.expectedCapitalGain')}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        +€{calculateExpectedGain(
                          rangeValue,
                          property.details.growthRate,
                          property.details.investmentDuration
                        ).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expected Total Gain */}
                <div className="mt-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">{t('properties.propertyDetails.expectedTotalGain')}</p>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setActiveTooltip('totalGain')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {activeTooltip === 'totalGain' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-1 rounded text-xs max-w-xs z-50">
                          {t('properties.propertyDetails.tooltips.totalGain')}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        +€{calculateExpectedTotalGain(
                          rangeValue,
                          property.details.growthRate,
                          property.details.investmentDuration,
                          durationProfit
                        ).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expected Investment Final Value */}
                <div className="mt-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">{t('properties.propertyDetails.expectedInvestmentFinalValue')}</p>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setActiveTooltip('finalValue')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {activeTooltip === 'finalValue' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-3 py-1 rounded text-xs max-w-xs z-50">
                          {t('properties.propertyDetails.tooltips.finalValue')}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        €{calculateInvestmentFinalValue(
                          rangeValue,
                          property.details.growthRate,
                          property.details.investmentDuration,
                          durationProfit
                        ).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invest Button */}
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors mt-6">
                  {t('properties.propertyDetails.investNow')}
                </button>
              </div>

              {/* Share Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{t('properties.propertyDetails.share')}</h3>
                  <div className="flex gap-4">
                    <Facebook className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600" />
                    <Twitter className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-400" />
                    <Linkedin className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-700" />
                    <Instagram className="h-5 w-5 text-gray-600 cursor-pointer hover:text-pink-600" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Share2 className="h-4 w-4" />
                  <button className="hover:text-orange-500">{t('properties.propertyDetails.copyLink')}</button>
                </div>
              </div>

              {/* Real Estate Investors */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="font-semibold mb-4">{t('properties.propertyDetails.realEstateInvestor')}</h3>
                {property.investors.map((investor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={investor.avatar}
                      alt={investor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{investor.name}</p>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.joined')} {investor.joinedDate}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-gray-600">{investor.properties} {t('properties.propertyDetails.properties')}</p>
                      <p className="text-sm text-gray-600">{t('properties.propertyDetails.nationality')}: {investor.nationality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}