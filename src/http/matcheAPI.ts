import {IMatch} from '../models/IMatch';
import {$authHost} from './index';

export const fetchMatchesAPI = async (): Promise<IMatch[]> => {
  const {data} = await $authHost.get('matches');
  return data.matches;
};
