/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CoinsDetailScreen = ({
  navigation,
  route: {
    params: {item},
  },
}) => {
  useEffect(() => {
    navigation.setOptions({title: item.symbol});
  }, []);

  const getSymbolIcon = () => {
    const symbol = item.name.toLowerCase().replace(' ', '-');
    return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
  };

  return (
    <View>
      <View>
        <Image style={styles.icon} source={{uri: getSymbolIcon()}} />
        <Text>{item.name}</Text>
        <Text>{item.rank}</Text>
        <Text>{item.name}</Text>
        <Text>{item.name}</Text>
        <Text>{item.name}</Text>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
  },
});

export default CoinsDetailScreen;
