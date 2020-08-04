import { Moment } from 'moment';

export interface IHistoriqueEnseignantFiliere {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
}

export class HistoriqueEnseignantFiliere implements IHistoriqueEnseignantFiliere {
  constructor(public id?: number, public datedebut?: Moment, public datefin?: Moment) {}
}
