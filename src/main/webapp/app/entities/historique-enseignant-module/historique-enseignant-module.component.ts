import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HistoriqueEnseignantModuleService } from './historique-enseignant-module.service';
import { HistoriqueEnseignantModuleDeleteDialogComponent } from './historique-enseignant-module-delete-dialog.component';

@Component({
  selector: 'jhi-historique-enseignant-module',
  templateUrl: './historique-enseignant-module.component.html'
})
export class HistoriqueEnseignantModuleComponent implements OnInit, OnDestroy {
  historiqueEnseignantModules: IHistoriqueEnseignantModule[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected historiqueEnseignantModuleService: HistoriqueEnseignantModuleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.historiqueEnseignantModules = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.historiqueEnseignantModuleService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IHistoriqueEnseignantModule[]>) => this.paginateHistoriqueEnseignantModules(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.historiqueEnseignantModules = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoriqueEnseignantModules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoriqueEnseignantModule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoriqueEnseignantModules(): void {
    this.eventSubscriber = this.eventManager.subscribe('historiqueEnseignantModuleListModification', () => this.reset());
  }

  delete(historiqueEnseignantModule: IHistoriqueEnseignantModule): void {
    const modalRef = this.modalService.open(HistoriqueEnseignantModuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historiqueEnseignantModule = historiqueEnseignantModule;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHistoriqueEnseignantModules(data: IHistoriqueEnseignantModule[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.historiqueEnseignantModules.push(data[i]);
      }
    }
  }
}
