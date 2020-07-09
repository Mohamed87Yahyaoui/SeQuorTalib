import { Moment } from 'moment';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';

export interface IHistoriqueEtudiantFiliere {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
  filieres?: IFiliere[];
  etudiants?: IEtudiant[];
}

export class HistoriqueEtudiantFiliere implements IHistoriqueEtudiantFiliere {
  constructor(
    public id?: number,
    public datedebut?: Moment,
    public datefin?: Moment,
    public filieres?: IFiliere[],
    public etudiants?: IEtudiant[]
  ) {}
}
