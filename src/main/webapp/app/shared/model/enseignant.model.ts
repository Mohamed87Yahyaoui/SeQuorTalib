import { Moment } from 'moment';
import { IDepartement } from 'app/shared/model/departement.model';
import { IUser } from 'app/core/user/user.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IModule } from 'app/shared/model/module.model';

export interface IEnseignant {
  id?: number;
  tel?: number;
  datenaissance?: Moment;
  cin?: string;
  grade?: string;
  departement?: IDepartement;
  user?: IUser;
  filieres?: IFiliere[];
  modules?: IModule[];
}

export class Enseignant implements IEnseignant {
  constructor(
    public id?: number,
    public tel?: number,
    public datenaissance?: Moment,
    public cin?: string,
    public grade?: string,
    public departement?: IDepartement,
    public user?: IUser,
    public filieres?: IFiliere[],
    public modules?: IModule[]
  ) {}
}
