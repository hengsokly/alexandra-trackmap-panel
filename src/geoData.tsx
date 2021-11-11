import { FeatureCollection, Feature } from 'geojson';
import axios from 'axios';

export type Position = number[][];

export function getGeoDatas(url: string, callback: Function) {
  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  if (!url) {
    return geoData;
  }

  axios.get(url).then((res) => {
    let geoJson = res.data;

    for (let i = 0; i < geoJson['features'].length; i++) {
      let p = geoJson['features'][i];

      geoData.features.push({
        type: 'Feature',
        id: i,
        geometry: {
          type: p.geometry.type,
          coordinates: p.geometry.coordinates,
        },
      } as Feature);
    }

    console.log('----geoData', geoData);

    callback(geoData);
  });

  return geoData;
}
