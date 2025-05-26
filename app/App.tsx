import React from 'react';
import {ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '@/components/ui/Button';
import {TextButton} from '@/components/ui/TextButton';
import {IconButton} from '@/components/ui/IconButton';

const intents = ['primary', 'ghost'] as const;
const sizes = ['sm', 'lg'] as const;

const markers = [
  {
    id: 'seoul',
    title: '서울시청',
    description: '서울의 중심',
    coordinate: {latitude: 37.5665, longitude: 126.978},
  },
  {
    id: 'gangnam',
    title: '강남역',
    description: '서울의 번화가',
    coordinate: {latitude: 37.4979, longitude: 127.0276},
  },
  {
    id: 'hongdae',
    title: '홍대입구',
    description: '젊음의 거리',
    coordinate: {latitude: 37.5572, longitude: 126.9245},
  },
];

export default function DemoMapWithButtons() {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider="google"
        initialRegion={{
          latitude: 37.5665,
          longitude: 126.978,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <ScrollView contentContainerStyle={styles.panel} pointerEvents="box-none">
        <Text style={styles.title}>Button Variants</Text>
        <View style={styles.section}>
          {intents.map(intent =>
            sizes.map(size => (
              <Button
                key={`btn-${intent}-${size}`}
                variantIntent={intent}
                variantSize={size}
                style={styles.button}>
                <Text>{`${intent} ${size}`}</Text>
              </Button>
            )),
          )}
        </View>

        <Text style={styles.title}>TextButton Variants</Text>
        <View style={styles.section}>
          {intents.map(intent =>
            sizes.map(size => (
              <TextButton
                key={`txtbtn-${intent}-${size}`}
                variantIntent={intent}
                variantSize={size}
                style={styles.button}>
                {`${intent} ${size}`}
              </TextButton>
            )),
          )}
        </View>

        <Text style={styles.title}>IconButton Variants</Text>
        <View style={styles.section}>
          {intents.map(intent =>
            sizes.map(size => (
              <IconButton
                key={`iconbtn-${intent}-${size}`}
                variantIntent={intent}
                variantSize={size}
                icon={require('./src/assets/icons/star.png')}
                onPress={() => {}}
              />
            )),
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
