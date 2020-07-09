import { IFiliere } from 'app/shared/model/filiere.model';
import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

export interface IModule {
  id?: number;
  nom?: string;
  semester?: number;
  filieres?: IFiliere[];
  historiqueEnseignantModule?: IHistoriqueEnseignantModule;
  historiqueEtudiantModule?: IHistoriqueEtudiantModule;
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public nom?: string,
    public semester?: number,
    public filieres?: IFiliere[],
    public historiqueEnseignantModule?: IHistoriqueEnseignantModule,
    public historiqueEtudiantModule?: IHistoriqueEtudiantModule
  ) {}
}
