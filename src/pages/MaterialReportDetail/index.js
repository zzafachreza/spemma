import React from 'react';
import {View, Text} from 'react-native';
import PDFView from 'react-native-view-pdf';

export default function PerjanjianDetail({navigation, route}) {
  const item = route.params;
  //   navigation.setOptions({title: item.nama});
  return (
    <View style={{flex: 1}}>
      <Text>{item.link}</Text>
      <PDFView
        fadeInDuration={250.0}
        style={{flex: 1}}
        resource={item.link}
        resourceType="file"
        // resourceType={}
        onLoad={() => console.log(`PDF rendered from `)}
        onError={error => console.log('Cannot render PDF', error)}
      />
    </View>
  );
}
