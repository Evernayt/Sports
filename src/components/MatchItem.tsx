import {FC} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IMatch} from '../models/IMatch';
import {SvgUri} from 'react-native-svg';
import isSVGFormatImage from '../helpers/isSVGFormatImage';
import getLocalDateTime from '../helpers/getLocalDateTime';
import {COLORS} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {MATCH_TEAMS_ROUTE} from '../constants/routes';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackNavigationProp<
  RootStackParamList,
  typeof MATCH_TEAMS_ROUTE
>;

interface MatchItemProps {
  match: IMatch;
}

const MatchItem: FC<MatchItemProps> = ({match}) => {
  const navigation = useNavigation<Props>();

  const openMatchTeams = () => {
    navigation.navigate(MATCH_TEAMS_ROUTE, {match});
  };

  const renderImage = (url: string) => {
    if (!url) return;
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
    <TouchableOpacity style={styles.container} onPress={openMatchTeams}>
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
      <View style={styles.teamsContainer}>
        <View style={[styles.teamContainer, {marginBottom: 8}]}>
          <View style={styles.teamInfo}>
            {renderImage(match.homeTeam.crest)}
            <Text style={styles.teamName}>{match.homeTeam.name}</Text>
          </View>
          <Text style={styles.score}>{match.score.fullTime.home}</Text>
        </View>
        <View style={styles.teamContainer}>
          <View style={styles.teamInfo}>
            {renderImage(match.awayTeam.crest)}
            <Text style={styles.teamName}>{match.awayTeam.name}</Text>
          </View>
          <Text style={styles.score}>{match.score.fullTime.away}</Text>
        </View>
      </View>
      <Text style={styles.footer}>
        {getLocalDateTime(new Date(match.utcDate))}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    margin: 8,
    borderRadius: 4,
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
  footer: {
    padding: 4,
    color: COLORS.primaryText,
  },
  teamsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.secondaryDeemphasized,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.primaryText,
    fontWeight: '500',
  },
  score: {
    color: COLORS.primaryText,
    fontWeight: '500',
  },
});

export default MatchItem;
