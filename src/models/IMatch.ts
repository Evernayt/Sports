import {IArea} from './IArea';
import {IAwayTeam} from './IAwayTeam';
import {ICompetition} from './ICompetition';
import {IHomeTeam} from './IHomeTeam';
import {IScore} from './IScore';

export interface IMatch {
  id: number;
  area: IArea;
  competition: ICompetition;
  utcDate: string;
  status: string;
  minute: string;
  injuryTime?: number;
  attendance?: any;
  venue: string;
  matchday: number;
  stage: string;
  group: string;
  lastUpdated: Date;
  homeTeam: IHomeTeam;
  awayTeam: IAwayTeam;
  score: IScore;
  bookings: any[];
  substitutions: any[];
}
