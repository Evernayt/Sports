import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import firebase_remote_config from './android/app/src/firebase_remote_config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {FIREBASE_URL_KEY} from './src/constants/storage';
import {WebComponent} from './src/components';
import {Home, MatchTeams} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_ROUTE, MATCH_TEAMS_ROUTE} from './src/constants/routes';
import {IMatch} from './src/models/IMatch';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
  HOME_ROUTE: undefined;
  MATCH_TEAMS_ROUTE: {match: IMatch};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    SplashScreen.hide();
    AsyncStorage.getItem(FIREBASE_URL_KEY).then(path => {
      if (!path) {
        remoteConfig()
          .setDefaults(firebase_remote_config)
          .then(() => remoteConfig().fetchAndActivate())
          .then(() => loadFire());
      } else {
        setUrl(path);
      }
    });
  }, []);

  const loadFire = () => {
    const url = remoteConfig().getValue('url').asString();
    DeviceInfo.isEmulator().then(isEmulator => {
      if (!url || isEmulator) {
        setUrl('');
      } else {
        setUrl(url);
        AsyncStorage.setItem(FIREBASE_URL_KEY, url);
      }
    });
  };

  return (
    <>
      {url ? (
        <WebComponent url={url} disableGoBack />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={HOME_ROUTE}>
            <Stack.Screen name={HOME_ROUTE} component={Home} />
            <Stack.Screen
              name={MATCH_TEAMS_ROUTE}
              component={MatchTeams}
              options={{headerShown: true, headerTitle: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
