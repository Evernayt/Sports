import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/theme';
import {ILineup} from '../models/ILineup';

interface PersonProps {
  person: ILineup;
}

const Person: FC<PersonProps> = ({person}) => {
  return (
    <View style={styles.personContainer}>
      <View>
        <Text style={styles.name}>{person.name}</Text>
        <Text>{person.position}</Text>
      </View>
      <View style={styles.shirtNumberContainer}>
        <Text style={styles.shirtNumber}>{person.shirtNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  name: {
    fontSize: 16,
    color: COLORS.primaryText,
    fontWeight: '500',
  },
  shirtNumberContainer: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shirtNumber: {
    color: COLORS.primaryText,
  },
});

export default Person;
