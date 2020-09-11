import { IModule } from 'app/shared/model/module.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { Valider } from 'app/shared/model/enumerations/valider.model';
import { Typevalidation } from 'app/shared/model/enumerations/typevalidation.model';

export interface IHistoriqueEtudiantModule {
  id?: number;
  note?: number;
  validation?: Valider;
  etat?: Typevalidation;
  modules?: IModule[];
  etudiants?: IEtudiant[];
}

export class HistoriqueEtudiantModule implements IHistoriqueEtudiantModule {
  constructor(
    public id?: number,
    public note?: number,
    public validation?: Valider,
    public etat?: Typevalidation,
    public modules?: IModule[],
    public etudiants?: IEtudiant[]
  ) {}
}
