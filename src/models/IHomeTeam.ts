import { ICoach } from './ICoach';
import {ILineup} from './ILineup';

export interface IHomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  leagueRank?: number;
  formation: string;
  coach: ICoach;
  lineup: ILineup[];
}
