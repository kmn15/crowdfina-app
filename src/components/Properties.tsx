import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useProperties } from '../hooks/useProperties';
import Swal from 'sweetalert2';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  status: string;
  yield: string;
  description: string;
}

export default function Properties() {
  const { t } = useTranslation();
  const {
    visibleProperties,
    loading,
    error,
    hasMore,
    loadMoreProperties,
    filterByCity,
    resetFilters,
    uniqueCities
  } = useProperties();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    if (city === '') {
      resetFilters();
    } else {
      filterByCity(city);
    }
  };

  const handleNotifyMe = () => {
    Swal.fire({
      title: t('properties.youWillBeNotified'),
      icon: 'success',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      iconColor: '#f97316',
      customClass: {
        popup: 'swal-custom'
      }
    });
    
  };

  const inputClasses = "w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm dark:text-white dark:placeholder-gray-400";
  const selectClasses = `${inputClasses} appearance-none`;

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (isNearBottom && !loading && hasMore) {
      loadMoreProperties();
    }
  }, [loading, hasMore, loadMoreProperties]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
        <div className="container mx-auto px-6 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('properties.title')}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Search Filters */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">{t('properties.filters.title')}</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t('properties.filters.searchPlaceholder')}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <select
                    className={selectClasses}
                    onChange={handleCityChange}
                  >
                    <option value="">{t('properties.filters.location')}</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select className={selectClasses}>
                    <option value="">{t('properties.filters.investmentType')}</option>
                    <option value="residential">{t('properties.filters.investmentTypeOptions.residential')}</option>
                    <option value="commercial">{t('properties.filters.investmentTypeOptions.commercial')}</option>
                  </select>
                </div>

                <div>
                  <select className={selectClasses}>
                    <option value="">{t('properties.filters.profitSchedule')}</option>
                    <option value="monthly">{t('properties.filters.profitScheduleOptions.monthly')}</option>
                    <option value="quarterly">{t('properties.filters.profitScheduleOptions.quarterly')}</option>
                    <option value="yearly">{t('properties.filters.profitScheduleOptions.yearly')}</option>
                  </select>
                </div>

                <div className="pt-2">
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">{t('properties.filters.capitalBack')}</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="capital-back"
                        value="all"
                        defaultChecked
                        className="w-4 h-4 text-orange-500 border-gray-300 dark:border-gray-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{t('properties.filters.capitalBackOptions.all')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="capital-back"
                        value="yes"
                        className="w-4 h-4 text-orange-500 border-gray-300 dark:border-gray-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{t('properties.filters.capitalBackOptions.yes')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="capital-back"
                        value="no"
                        className="w-4 h-4 text-orange-500 border-gray-300 dark:border-gray-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{t('properties.filters.capitalBackOptions.no')}</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">{t('properties.filters.investmentRange')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="text"
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm dark:text-white"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="text"
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 mt-2 bg-white dark:bg-gray-700 text-orange-500 dark:text-orange-400 rounded-lg font-medium border-2 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10 20H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {t('properties.filters.filterNow')}
                </button>
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProperties.map((property) => (
                <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{property.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{property.location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{property.description}</p>
                    <div className="h-1 bg-orange-500 w-1/3 mb-6"></div>

                    {/* Price and Yield Section */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{t('common.price')}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{t('common.expectedYield')}</p>
                        <p className="text-lg font-bold text-orange-500 dark:text-orange-400">{property.yield}</p>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{t('properties.propertyDetails.beds')}</span>
                        <p className="font-semibold dark:text-white">{property.bedrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{t('properties.propertyDetails.baths')}</span>
                        <p className="font-semibold dark:text-white">{property.bathrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{t('properties.propertyDetails.area')}</span>
                        <p className="font-semibold dark:text-white">{property.area} {t('properties.propertyDetails.sqft')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{t('properties.propertyDetails.yield')}</span>
                        <p className="font-semibold text-green-600 dark:text-green-400">{property.yield}</p>
                      </div>
                    </div>

                    {/* Invest Now Button */}
                    <Link
                      to={`/properties/${property.id}`}
                      className="block w-full py-3 bg-orange-500 dark:bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{t('properties.propertyDetails.details')}</span>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Updated Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <ReactLoading
                  type="bars"
                  color="#f97316"
                  height={50}
                  width={50}
                />
              </div>
            )}

            {/* Display More Button */}
            {!loading && hasMore && (
              <div className="text-center py-8">
                <button
                  onClick={loadMoreProperties}
                  className="px-6 py-3 bg-white dark:bg-gray-700 text-orange-500 dark:text-orange-400 rounded-lg font-medium border-2 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  {t('properties.displayMore')}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-center py-8 text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            {/* No more properties message */}
            {!loading && !hasMore && visibleProperties.length > 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t('properties.noMoreProperties')}
                <button
                  className="mt-4 px-6 py-3 bg-white dark:bg-gray-700 text-orange-500 dark:text-orange-400 rounded-lg font-medium border-2 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                  onClick={handleNotifyMe}
                >
                  {t('properties.notifyMe')}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 