import { Moment } from 'moment';

export interface IHistoriqueEnseignantModule {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
}

export class HistoriqueEnseignantModule implements IHistoriqueEnseignantModule {
  constructor(public id?: number, public datedebut?: Moment, public datefin?: Moment) {}
}
