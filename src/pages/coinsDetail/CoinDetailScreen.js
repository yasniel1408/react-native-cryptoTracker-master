/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import colors from '../../utils/colors';
import Http from '../../utils/http';
import CoinMarketItem from './CoinMarketItem';

const CoinsDetailScreen = ({
  navigation,
  route: {
    params: {coin},
  },
}) => {
  const [markets, setMarkets] = useState([]);
  const sections = [
    {
      title: 'Market cap',
      data: [coin?.market_cap_usd],
    },
    {
      title: 'Volume 24h',
      data: [coin?.volume24],
    },
    {
      title: 'Change 24h',
      data: [coin?.percent_change_24h],
    },
  ];

  useEffect(() => {
    navigation.setOptions({title: coin.symbol});
    const getMarkets = async () => {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coin?.id}`;
      const marketsReq = await Http.instance.get(url);
      setMarkets(marketsReq.data);
    };
    getMarkets();
  }, []);

  const getSymbolIcon = () => {
    const symbol = coin.name.toLowerCase().replace(' ', '-');
    return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image style={styles.iconImg} source={{uri: getSymbolIcon()}} />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>

      <SectionList
        style={styles.section}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
        horizontal={true}
      />
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
