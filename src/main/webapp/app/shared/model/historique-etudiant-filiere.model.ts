import { Moment } from 'moment';

export interface IHistoriqueEtudiantFiliere {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
}

export class HistoriqueEtudiantFiliere implements IHistoriqueEtudiantFiliere {
  constructor(public id?: number, public datedebut?: Moment, public datefin?: Moment) {}
}
