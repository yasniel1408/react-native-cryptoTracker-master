import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../../utils/colors';
import Http from '../../utils/http';
import CoisItem from './CoistItem';

const CoinsScreen = ({navigation}) => {
  const [coinsJson, setCoinsJson] = useState();
  const [loading, setLoading] = useState(false);

  const handlePress = async item => {
    navigation.navigate('CoinsDetail', {item});
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <FlatList
          data={coinsJson}
          renderItem={({item}) => (
            <CoisItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
      <Pressable style={styles.btn} onPress={() => handlePress()}>
        <Text style={styles.btnText}>Ir a Detail</Text>
      </Pressable>
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
