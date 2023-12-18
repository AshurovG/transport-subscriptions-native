import React, {useState, } from 'react';
import { View, Text, Button, Pressable, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SubscriptionData } from './subscriptionCard';
import NavigationBar from './navbar';

type SubscriptionDetailsRouteProp = RouteProp<{
  subscriptionDetailsScreen: { subscription: SubscriptionData };
}, 'subscriptionDetailsScreen'>;

const ObjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionDetailsRouteProp>();
  const [currentSubscription, setSubscription] = useState<SubscriptionData>()
  const { subscription } = route.params;
  const getSubscription = async () => {
    try {
        const response = await axios(`http://192.168.0.100:8000/subscriptions/${subscription.id}`, {
            method: 'GET',
        });
        setSubscription({
          id: response.data.id,
          title: response.data.title,
          price: response.data.price,
          info: response.data.info,
          src: response.data.src,
          categoryTitle: response.data.category
        }
      )
    }
    catch(e){
      throw e
    }
  };

  React.useEffect(() => {
    getSubscription()
  }, [])

  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Image source={{ uri: subscription?.src }} style={styles.image} />
        <Text style={styles.title}>Название:{subscription?.title}</Text>
        <Text style={styles.info}>Цена: {subscription?.price}</Text>
        <Text style={styles.info}>Доп информация: {subscription?.info}</Text>
        {/* Дополнительная информация о объекте */}
      </View>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
     <Text style={styles.text}>Назад</Text>
   </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', // Пример задания ширины изображения
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10, // Добавляем отступ снизу для текста
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2787F5',
    marginTop: 10
   },
   text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
   },
});

export default ObjectDetailsScreen;