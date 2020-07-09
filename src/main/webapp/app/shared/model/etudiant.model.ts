import { Moment } from 'moment';
import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';
import { IEtablissement } from 'app/shared/model/etablissement.model';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IEtudiant {
  id?: number;
  tel?: number;
  cin?: string;
  semsetre?: number;
  section?: string;
  etat?: Status;
  datenaissance?: Moment;
  historiqueEtudiantFiliere?: IHistoriqueEtudiantFiliere;
  etablissement?: IEtablissement;
  historiqueEtudiantModule?: IHistoriqueEtudiantModule;
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
    public historiqueEtudiantFiliere?: IHistoriqueEtudiantFiliere,
    public etablissement?: IEtablissement,
    public historiqueEtudiantModule?: IHistoriqueEtudiantModule
  ) {}
}
