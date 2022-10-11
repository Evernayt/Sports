import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Team} from '../components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {MATCH_TEAMS_ROUTE} from '../constants/routes';
import isSVGFormatImage from '../helpers/isSVGFormatImage';
import {SvgUri} from 'react-native-svg';
import {COLORS} from '../constants/theme';
import {awayTeam, homeTeam} from '../constants/mock';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof MATCH_TEAMS_ROUTE
>;

const MatchTeams = ({route}: Props) => {
  const {match} = route.params;

  const renderImage = (url: string) => {
    if (isSVGFormatImage(url)) {
      return (
        <View pointerEvents="none">
          <SvgUri width={24} height={24} uri={url} />
        </View>
      );
    } else {
      return (
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={{uri: url}}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.area}>
            {renderImage(match.area.flag)}
            <Text
              style={
                styles.headerText
              }>{`  ${match.area.name}, ${match.competition.name}`}</Text>
          </View>
          <Text style={styles.status}>{match.status}</Text>
        </View>
        <Team team={homeTeam} />
        <View style={styles.vsContainer}>
          <Text style={styles.vs}>VS</Text>
        </View>
        <Team team={awayTeam} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.primaryText,
  },
  status: {
    backgroundColor: COLORS.primaryDeemphasized,
    padding: 4,
    color: '#fff',
    borderRadius: 4,
    fontSize: 10,
  },
  vsContainer: {
    backgroundColor: COLORS.primaryDeemphasized,
    marginVertical: 24,
  },
  vs: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    padding: 8,
    fontWeight: '500',
  },
});

export default MatchTeams;
