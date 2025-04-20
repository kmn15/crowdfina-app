import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Property } from '../types/property';

interface UsePropertiesReturn {
  visibleProperties: Property[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  uniqueCities: string[];
  loadMoreProperties: () => void;
  filterByCity: (city: string) => void;
  resetFilters: () => void;
}

export function useProperties(): UsePropertiesReturn {
  const [visibleProperties, setVisibleProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  const propertiesPerPage = 6;

  // Fetch all properties from Supabase
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getProperties();
      setAllProperties(data);
      // Calculate unique cities from the fetched data
      const cities = Array.from(new Set(data.map((property: Property) => property.location)));
      setUniqueCities(cities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get filtered properties based on selected city
  const getFilteredProperties = useCallback(() => {
    if (!selectedCity) return allProperties;
    return allProperties.filter(property => property.location === selectedCity);
  }, [selectedCity, allProperties]);

  // Check if there are more properties to load
  const hasMore = useCallback(() => {
    const filteredProperties = getFilteredProperties();
    return currentIndex < filteredProperties.length;
  }, [currentIndex, getFilteredProperties]);

  // Load more properties
  const loadMoreProperties = useCallback(() => {
    if (loading || !hasMore()) return;

    const filteredProperties = getFilteredProperties();
    const nextBatch = filteredProperties.slice(currentIndex, currentIndex + propertiesPerPage);

    setVisibleProperties(prev => [...prev, ...nextBatch]);
    setCurrentIndex(prev => prev + propertiesPerPage);
  }, [loading, hasMore, currentIndex, getFilteredProperties]);

  // Filter properties by city
  const filterByCity = useCallback((city: string) => {
    setSelectedCity(city);
    setCurrentIndex(0);
    const filteredProperties = city 
      ? allProperties.filter(property => property.location === city)
      : allProperties;
    setVisibleProperties(filteredProperties.slice(0, propertiesPerPage));
  }, [allProperties]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSelectedCity('');
    setCurrentIndex(0);
    setVisibleProperties(allProperties.slice(0, propertiesPerPage));
  }, [allProperties]);

  // Initial fetch of properties
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Set initial visible properties after fetching all properties
  useEffect(() => {
    if (allProperties.length > 0) {
      resetFilters();
    }
  }, [allProperties, resetFilters]);

  return {
    visibleProperties,
    loading,
    error,
    hasMore: hasMore(),
    uniqueCities,
    loadMoreProperties,
    filterByCity,
    resetFilters
  };
}