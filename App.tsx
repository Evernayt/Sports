import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
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
import {View} from 'react-native';

export type RootStackParamList = {
  HOME_ROUTE: undefined;
  MATCH_TEAMS_ROUTE: {match: IMatch};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [url, setUrl] = useState<string>('LOADING');

  useEffect(() => {
    AsyncStorage.getItem(FIREBASE_URL_KEY).then(path => {
      remoteConfig()
        .fetchAndActivate()
        .then(() => loadFire(path));
    });
  }, []);

  useEffect(() => {
    if (url !== 'LOADING') {
      SplashScreen.hide();
    }
  }, [url]);

  const loadFire = (path: string | null) => {
    if (path) {
      setUrl(path);
    } else {
      const url = remoteConfig().getValue('url').asString();
      DeviceInfo.isEmulator().then(isEmulator => {
        if (!url || isEmulator) {
          setUrl(url);
        } else {
          setUrl(url);
          AsyncStorage.setItem(FIREBASE_URL_KEY, url);
        }
      });
    }
  };

  const renderByUrl = () => {
    if (url === 'LOADING') {
      return null;
    } else if (url) {
      return <WebComponent url={url} disableGoBack />;
    } else {
      return (
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
      );
    }
  };

  return <View style={{flex: 1}}>{renderByUrl()}</View>;
};

export default App;
