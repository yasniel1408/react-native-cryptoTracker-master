import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import colors from '../../utils/colors';
import Http from '../../utils/http';
import CoinItem from './CointItem';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = ({navigation}) => {
  const [coinsJson, setCoinsJson] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePress = async coin => {
    navigation.navigate('CoinsDetail', {coin});
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let coins = await Http.instance.get(
        'https://api.coinlore.net/api/tickers/',
      );
      setCoinsJson(coins.data.data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSearch = query => {
    const coinsFiltered = coinsJson.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.target.value.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.target.value.toLowerCase())
      );
    });
    setCoinsJson(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <FlatList
          data={coinsJson}
          renderItem={({item}) => (
            <CoinItem coin={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 29,
  },
  btn: {
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CoinsScreen;
