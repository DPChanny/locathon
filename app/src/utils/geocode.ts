import axios from 'axios';
import {GOOGLE_MAP_API_KEY} from '@env';
import qs from 'qs';

export const geocodeAddress = async (address: string) => {
  const cleaned = address
    .replace(/\(.+?\)/g, '') // 괄호 내용 제거
    .replace(/단지.*$/, '') // 단지 관련 정보 제거
    .replace(/\d+층.*/g, '') // 층수 제거
    .replace(/1층|2층|지하.*|B\d+/gi, '') // 흔한 패턴 제거
    .replace(/,\s*.*호$/, '') // 호수 제거
    .trim();

  try {
    console.log('[📦 Geocode request]', {
      address: cleaned,
      key: GOOGLE_MAP_API_KEY,
    });

    const res = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: cleaned,
          key: GOOGLE_MAP_API_KEY,
        },
        paramsSerializer: params => qs.stringify(params, {encode: true}),
      },
    );

    if (res.data.status === 'OK') {
      const location = res.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    }
    console.warn('Geocode failed for:', address);
    return null;
  } catch (e) {
    console.error('Geocoding error:', e);
    return null;
  }
};
