import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Region} from 'react-native-maps';
import styled from 'styled-components/native';
import debounce from 'lodash.debounce';
import {useFocusEffect} from '@react-navigation/native';

import BottomSheet, {BottomSheetRef} from '../../components/ui/BottomSheet';
import SearchInput from '../../components/inputs/SearchInput';
import SelectButton from '../../components/buttons/SelectButton';
import {colors} from '../../styles/colors';
import fridge from '../../assets/images/map/fridge_marker.png';
import store from '../../assets/images/map/store_marker.png';
import {markers} from '../../data/markers';
import {geocodeAddress} from '../../utils/geocode';

const StyledMapView = styled(MapView)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const DEFAULT_REGION = {
  latitude: 37.2828,
  longitude: 127.0156,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const FoodMap = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const mapRef = useRef<MapView>(null);
  const [filter, setFilter] = useState<'전체' | '냉장고' | '기부 참여한 가게'>(
    '전체',
  );
  const [markerCoords, setMarkerCoords] = useState<
    {
      id: string;
      type: string;
      title: string;
      coordinate: {latitude: number; longitude: number};
    }[]
  >([]);

  useEffect(() => {
    const fetchCoords = async () => {
      const results = await Promise.all(
        markers.map(async marker => {
          const coords = await geocodeAddress(marker.address);
          console.log(`[Geocode] ${marker.title} ->`, coords);
          if (!coords) return null;
          return {
            ...marker,
            coordinate: coords,
          };
        }),
      );
      const filtered = results.filter(Boolean) as typeof markerCoords;
      setMarkerCoords(filtered);

      if (filtered.length && mapRef.current) {
        mapRef.current.animateToRegion(
          {
            ...filtered[0].coordinate,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500,
        );
      }
    };

    fetchCoords();
  }, []);

  const checkOutOfBounds = (region: Region) => {
    const maxLat = 37.35;
    const minLat = 37.2;
    const maxLng = 127.08;
    const minLng = 126.95;

    return (
      region.latitude < minLat ||
      region.latitude > maxLat ||
      region.longitude < minLng ||
      region.longitude > maxLng
    );
  };

  const handleCollapse = useMemo(
    () =>
      debounce(() => {
        bottomSheetRef.current?.collapse?.();
      }, 200),
    [],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.cream,
        padding: 20,
      }}>
      <StyledMapView
        ref={mapRef}
        initialRegion={DEFAULT_REGION}
        onRegionChangeComplete={region => {
          if (checkOutOfBounds(region)) {
            mapRef.current?.animateToRegion(DEFAULT_REGION, 300);
          }
        }}
        onPanDrag={handleCollapse}
        onRegionChangeStart={handleCollapse}>
        {markerCoords.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            image={marker.type === 'fridge' ? fridge : store}
          />
        ))}
      </StyledMapView>

      <SearchInput />

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginVertical: 15,
          alignSelf: 'flex-start',
        }}>
        {['전체', '냉장고', '기부 참여한 가게'].map(label => (
          <SelectButton
            key={label}
            title={label}
            isSelected={filter === label}
            onPress={() => setFilter(label as typeof filter)}
          />
        ))}
      </View>

      <BottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

export default FoodMap;
