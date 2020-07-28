import { Moment } from 'moment';
import { IEtablissement } from 'app/shared/model/etablissement.model';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { IUser } from 'app/core/user/user.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IEtudiant {
  id?: number;
  tel?: number;
  cin?: string;
  semsetre?: number;
  section?: string;
  etat?: Status;
  datenaissance?: Moment;
  codeEtudiant?: number;
  etablissement?: IEtablissement;
  historiqueEtudiantModule?: IHistoriqueEtudiantModule;
  user?: IUser;
  filiere?: IFiliere;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public tel?: number,
    public cin?: string,
    public semsetre?: number,
    public section?: string,
    public etat?: Status,
    public datenaissance?: Moment,
    public codeEtudiant?: number,
    public etablissement?: IEtablissement,
    public historiqueEtudiantModule?: IHistoriqueEtudiantModule,
    public user?: IUser,
    public filiere?: IFiliere
  ) {}
}
