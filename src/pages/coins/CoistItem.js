import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import colors from '../../utils/colors';

const CoisItem = ({item, onPress}) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={style.container}>
      <View style={style.row}>
        <Text style={style.symbolText}>{item.symbol}</Text>
        <Text style={style.nameText}>{item.name}</Text>
        <Text style={style.priceText}>{`$${item.price_usd} USD`}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.percentText}>{`${item.percent_change_1h} 1h`}</Text>
        <Image style={style.imgIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};

export default CoisItem;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});
