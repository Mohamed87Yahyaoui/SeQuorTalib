import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModule } from 'app/shared/model/module.model';

@Component({
  selector: 'jhi-module-detail',
  templateUrl: './module-detail.component.html'
})
export class ModuleDetailComponent implements OnInit {
  module: IModule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ module }) => (this.module = module));
  }

  previousState(): void {
    window.history.back();
  }
}
