import { originCardsContent, countryCollections } from '../data.jsx';

export function useCountryContent(country) {
  const hasOriginCards = originCardsContent[country]?.length > 0;
  const hasRecordCollections = countryCollections[country]?.length > 0;
  const isAvailable = hasOriginCards || hasRecordCollections;
  
  return { hasOriginCards, hasRecordCollections, isAvailable };
}
