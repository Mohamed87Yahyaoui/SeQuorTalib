import { Moment } from 'moment';
import { IEtablissement } from 'app/shared/model/etablissement.model';
import { IUser } from 'app/core/user/user.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { IModule } from 'app/shared/model/module.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IEtudiant {
  id?: number;
  tel?: number;
  cin?: string;
  etat?: Status;
  datenaissance?: Moment;
  semsetre?: number;
  section?: string;
  promo?: number;
  etablissement?: IEtablissement;
  user?: IUser;
  filiere?: IFiliere;
  historiqueEtudiantModules?: IHistoriqueEtudiantModule[];
  modules?: IModule[];
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public tel?: number,
    public cin?: string,
    public etat?: Status,
    public datenaissance?: Moment,
    public semsetre?: number,
    public section?: string,
    public promo?: number,
    public etablissement?: IEtablissement,
    public user?: IUser,
    public filiere?: IFiliere,
    public historiqueEtudiantModules?: IHistoriqueEtudiantModule[],
    public modules?: IModule[]
  ) {}
}
