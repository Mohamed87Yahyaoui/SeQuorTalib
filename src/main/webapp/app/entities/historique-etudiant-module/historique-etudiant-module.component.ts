import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HistoriqueEtudiantModuleService } from './historique-etudiant-module.service';
import { HistoriqueEtudiantModuleDeleteDialogComponent } from './historique-etudiant-module-delete-dialog.component';

@Component({
  selector: 'jhi-historique-etudiant-module',
  templateUrl: './historique-etudiant-module.component.html'
})
export class HistoriqueEtudiantModuleComponent implements OnInit, OnDestroy {
  historiqueEtudiantModules: IHistoriqueEtudiantModule[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected historiqueEtudiantModuleService: HistoriqueEtudiantModuleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.historiqueEtudiantModules = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.historiqueEtudiantModuleService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IHistoriqueEtudiantModule[]>) => this.paginateHistoriqueEtudiantModules(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.historiqueEtudiantModules = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoriqueEtudiantModules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoriqueEtudiantModule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoriqueEtudiantModules(): void {
    this.eventSubscriber = this.eventManager.subscribe('historiqueEtudiantModuleListModification', () => this.reset());
  }

  delete(historiqueEtudiantModule: IHistoriqueEtudiantModule): void {
    const modalRef = this.modalService.open(HistoriqueEtudiantModuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historiqueEtudiantModule = historiqueEtudiantModule;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHistoriqueEtudiantModules(data: IHistoriqueEtudiantModule[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.historiqueEtudiantModules.push(data[i]);
      }
    }
  }
}
