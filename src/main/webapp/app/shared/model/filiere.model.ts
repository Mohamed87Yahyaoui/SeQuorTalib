import { IModule } from 'app/shared/model/module.model';
import { IDepartement } from 'app/shared/model/departement.model';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

export interface IFiliere {
  id?: number;
  nom?: string;
  modules?: IModule[];
  departement?: IDepartement;
  historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere;
  historiqueEtudiantFiliere?: IHistoriqueEtudiantFiliere;
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nom?: string,
    public modules?: IModule[],
    public departement?: IDepartement,
    public historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere,
    public historiqueEtudiantFiliere?: IHistoriqueEtudiantFiliere
  ) {}
}
