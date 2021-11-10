/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../../utils/colors';

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
    <View style={styles.container}>
      <View>
        <Image style={styles.iconImg} source={{uri: getSymbolIcon()}} />
        <Text>{item.name}</Text>
        <Text>{item.rank}</Text>
        <Text>{item.price_usd}dd</Text>
        <Text>{item.name}</Text>
        <Text>{item.name}</Text>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});

export default CoinsDetailScreen;
