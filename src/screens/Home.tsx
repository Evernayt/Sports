import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {MatchItem} from '../components';
import {logo} from '../constants/images';
import {COLORS} from '../constants/theme';
import {fetchMatchesAPI} from '../http/matcheAPI';
import {IMatch} from '../models/IMatch';

const Home = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = () => {
    fetchMatchesAPI()
      .then(data => setMatches(data))
      .finally(() => setRefreshing(false));
  };

  const refresh = () => {
    setRefreshing(true);
    fetchMatches();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <FlatList
        data={matches}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={item => <MatchItem match={item.item} />}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Home;
