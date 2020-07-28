import { IModule } from 'app/shared/model/module.model';
import { IDepartement } from 'app/shared/model/departement.model';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';

export interface IFiliere {
  id?: number;
  nom?: string;
  modules?: IModule[];
  departement?: IDepartement;
  historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere;
  etudiants?: IEtudiant[];
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nom?: string,
    public modules?: IModule[],
    public departement?: IDepartement,
    public historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere,
    public etudiants?: IEtudiant[]
  ) {}
}
