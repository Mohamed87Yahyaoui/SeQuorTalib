import { IDepartement } from 'app/shared/model/departement.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';
import { IModule } from 'app/shared/model/module.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';

export interface IFiliere {
  id?: number;
  nom?: string;
  departement?: IDepartement;
  enseignants?: IEnseignant[];
  modules?: IModule[];
  etudiants?: IEtudiant[];
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nom?: string,
    public departement?: IDepartement,
    public enseignants?: IEnseignant[],
    public modules?: IModule[],
    public etudiants?: IEtudiant[]
  ) {}
}
