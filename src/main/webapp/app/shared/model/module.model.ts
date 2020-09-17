import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface IModule {
  id?: number;
  nom?: string;
  semester?: number;
  etudiants?: IEtudiant[];
  filiere?: IFiliere;
  historiqueEtudiantModules?: IHistoriqueEtudiantModule[];
  enseignants?: IEnseignant[];
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public nom?: string,
    public semester?: number,
    public etudiants?: IEtudiant[],
    public filiere?: IFiliere,
    public historiqueEtudiantModules?: IHistoriqueEtudiantModule[],
    public enseignants?: IEnseignant[]
  ) {}
}
