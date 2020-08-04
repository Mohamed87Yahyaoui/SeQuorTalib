import { IModule } from 'app/shared/model/module.model';
import { IDepartement } from 'app/shared/model/departement.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface IFiliere {
  id?: number;
  nom?: string;
  modules?: IModule[];
  departement?: IDepartement;
  enseignants?: IEnseignant[];
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nom?: string,
    public modules?: IModule[],
    public departement?: IDepartement,
    public enseignants?: IEnseignant[]
  ) {}
}
