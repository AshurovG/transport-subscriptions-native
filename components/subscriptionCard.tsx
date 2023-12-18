import React, {useState} from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export type SubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  categoryTitle: string;
}

interface ObjectCardProps {
  subscription: SubscriptionData;
  onDetailsPress: () => void; 
}

const ObjectCard: React.FC<ObjectCardProps> = ({ subscription }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: subscription?.src}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{subscription?.categoryTitle}</Text>
          <Text style={styles.info}>{subscription?.title}</Text>
          <Text style={styles.info}>{subscription?.price} руб.</Text>

          {/* <Text style={styles.price}>{object.price}</Text> */}

  
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2787F5',
    color: '#fff',
    borderRadius: 8,
    padding: 40,
    marginVertical: 8,
    elevation: 2,
    width: '90%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  info: {
    fontSize: 16,
    color: '#fff',
  },
  price: {
    fontSize: 14,
    color: '#fff',
  },
  detailsButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ObjectCard;