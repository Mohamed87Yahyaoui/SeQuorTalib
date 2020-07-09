import { Moment } from 'moment';
import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { IDepartement } from 'app/shared/model/departement.model';

export interface IEnseignant {
  id?: number;
  tel?: number;
  datenaissance?: Moment;
  cin?: string;
  grade?: string;
  historiqueEnseignantModule?: IHistoriqueEnseignantModule;
  historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere;
  departement?: IDepartement;
}

export class Enseignant implements IEnseignant {
  constructor(
    public id?: number,
    public tel?: number,
    public datenaissance?: Moment,
    public cin?: string,
    public grade?: string,
    public historiqueEnseignantModule?: IHistoriqueEnseignantModule,
    public historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere,
    public departement?: IDepartement
  ) {}
}
