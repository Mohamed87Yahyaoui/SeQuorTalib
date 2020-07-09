import { IEtudiant } from 'app/shared/model/etudiant.model';
import { Typecycle } from 'app/shared/model/enumerations/typecycle.model';

export interface IEtablissement {
  id?: number;
  nom?: string;
  filiere?: string;
  cycle?: Typecycle;
  etudiants?: IEtudiant[];
}

export class Etablissement implements IEtablissement {
  constructor(public id?: number, public nom?: string, public filiere?: string, public cycle?: Typecycle, public etudiants?: IEtudiant[]) {}
}
