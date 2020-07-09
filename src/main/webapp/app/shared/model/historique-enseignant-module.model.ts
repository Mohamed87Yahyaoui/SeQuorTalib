import { Moment } from 'moment';
import { IModule } from 'app/shared/model/module.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface IHistoriqueEnseignantModule {
  id?: number;
  datedebut?: Moment;
  datefin?: Moment;
  modules?: IModule[];
  enseignants?: IEnseignant[];
}

export class HistoriqueEnseignantModule implements IHistoriqueEnseignantModule {
  constructor(
    public id?: number,
    public datedebut?: Moment,
    public datefin?: Moment,
    public modules?: IModule[],
    public enseignants?: IEnseignant[]
  ) {}
}
