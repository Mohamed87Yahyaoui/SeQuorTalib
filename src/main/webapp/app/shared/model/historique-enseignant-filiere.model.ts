import { Moment } from 'moment';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface IHistoriqueEnseignantFiliere {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
  filieres?: IFiliere[];
  enseignants?: IEnseignant[];
}

export class HistoriqueEnseignantFiliere implements IHistoriqueEnseignantFiliere {
  constructor(
    public id?: number,
    public datedebut?: Moment,
    public datefin?: Moment,
    public filieres?: IFiliere[],
    public enseignants?: IEnseignant[]
  ) {}
}
