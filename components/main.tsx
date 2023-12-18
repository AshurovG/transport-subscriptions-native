import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import SubscriptionCard, {SubscriptionData} from './subscriptionCard';
import NavigationBar from './navbar';
import {  TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}

type RootStackParamList = {
    MainScreen: undefined;
    SubscriptionDetailsScreen: { subscription: SubscriptionData };
  };
  
  type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState<SubscriptionData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const getSubscriptions = async () => {
      try {
          const response = await axios('http://192.168.0.100:8000/subscriptions', {
              method: 'GET',
          });
          const subscriptions = response.data.subscriptions;
          const newArr = subscriptions.map((raw: ReceivedSubscriptionData) => ({
              id: raw.id,
              title: raw.title,
              price: raw.price,
              info: raw.info,
              src: raw.src,
              categoryTitle: raw.category
          }));
          setSubscriptions(newArr)
          setTimeout(getSubscriptions, 1000); // вызов getSubscriptions каждые 1 секунду
      }
      catch(e){
        throw e
      }
     };

    useEffect(() => {
      getSubscriptions();
    }, []);
  
    useEffect(() => {
      if (searchQuery === '') {
        setFilteredSubscriptions(subscriptions);
      } else {
        const filtered = subscriptions.filter(
          (subscription) =>
            subscription.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredSubscriptions(filtered);
      }
      console.log('title', searchQuery)
      console.log('')
    }, [searchQuery, subscriptions]);
  
    const handleDetailsPress = (subscription: SubscriptionData) => {
      console.log('Details Pressed:', subscription.title);
      navigation.navigate('SubscriptionDetailsScreen', { subscription });
    };
  
    const renderSubscriptionCard = ({ item }: { item: SubscriptionData }) => {
      return (
        <TouchableOpacity onPress={() => handleDetailsPress(item)}>
          <SubscriptionCard subscription={item} onDetailsPress={() => {}} />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput
          style={styles.input}
          placeholder="Поиск по названию*"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <FlatList
          data={filteredSubscriptions}
          renderItem={renderSubscriptionCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginTop: 10,
    },
  });
  
  export default MainScreen;