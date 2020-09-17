import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IModule } from 'app/shared/model/module.model';
import { Valider } from 'app/shared/model/enumerations/valider.model';
import { Typevalidation } from 'app/shared/model/enumerations/typevalidation.model';

export interface IHistoriqueEtudiantModule {
  id?: number;
  note?: number;
  validation?: Valider;
  etat?: Typevalidation;
  etudiant?: IEtudiant;
  module?: IModule;
}

export class HistoriqueEtudiantModule implements IHistoriqueEtudiantModule {
  constructor(
    public id?: number,
    public note?: number,
    public validation?: Valider,
    public etat?: Typevalidation,
    public etudiant?: IEtudiant,
    public module?: IModule
  ) {}
}
