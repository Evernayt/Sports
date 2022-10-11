import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {COLORS} from '../constants/theme';
import isSVGFormatImage from '../helpers/isSVGFormatImage';
import {IAwayTeam} from '../models/IAwayTeam';
import {IHomeTeam} from '../models/IHomeTeam';
import Person from './Person';

interface TeamProps {
  team: IHomeTeam | IAwayTeam;
}

const Team: FC<TeamProps> = ({team}) => {
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
    <>
      <>
        <Text style={styles.title}>Team</Text>
        <View style={styles.team}>
          {renderImage(team.crest)}
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      </>
      <>
        <Text style={styles.title}>Coach</Text>
        <Text style={styles.coachName}>{team.coach.name}</Text>
        <Text style={styles.coachNationality}>
          Nationality: {team.coach.nationality}
        </Text>
      </>
      <>
        <Text style={styles.title}>Lineup</Text>
        {team.lineup.map(person => (
          <Person person={person} key={person.id} />
        ))}
      </>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
    marginLeft: 6,
  },
  coachName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
    textAlign: 'center',
  },
  coachNationality: {
    textAlign: 'center',
  },
});

export default Team;
