import { IFiliere } from 'app/shared/model/filiere.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface IDepartement {
  id?: number;
  nom?: string;
  filieres?: IFiliere[];
  enseignants?: IEnseignant[];
}

export class Departement implements IDepartement {
  constructor(public id?: number, public nom?: string, public filieres?: IFiliere[], public enseignants?: IEnseignant[]) {}
}
