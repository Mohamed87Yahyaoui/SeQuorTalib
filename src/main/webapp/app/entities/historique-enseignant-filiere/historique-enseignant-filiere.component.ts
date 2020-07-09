import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HistoriqueEnseignantFiliereService } from './historique-enseignant-filiere.service';
import { HistoriqueEnseignantFiliereDeleteDialogComponent } from './historique-enseignant-filiere-delete-dialog.component';

@Component({
  selector: 'jhi-historique-enseignant-filiere',
  templateUrl: './historique-enseignant-filiere.component.html'
})
export class HistoriqueEnseignantFiliereComponent implements OnInit, OnDestroy {
  historiqueEnseignantFilieres: IHistoriqueEnseignantFiliere[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected historiqueEnseignantFiliereService: HistoriqueEnseignantFiliereService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.historiqueEnseignantFilieres = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.historiqueEnseignantFiliereService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IHistoriqueEnseignantFiliere[]>) => this.paginateHistoriqueEnseignantFilieres(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.historiqueEnseignantFilieres = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoriqueEnseignantFilieres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoriqueEnseignantFiliere): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoriqueEnseignantFilieres(): void {
    this.eventSubscriber = this.eventManager.subscribe('historiqueEnseignantFiliereListModification', () => this.reset());
  }

  delete(historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere): void {
    const modalRef = this.modalService.open(HistoriqueEnseignantFiliereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historiqueEnseignantFiliere = historiqueEnseignantFiliere;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHistoriqueEnseignantFilieres(data: IHistoriqueEnseignantFiliere[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.historiqueEnseignantFilieres.push(data[i]);
      }
    }
  }
}
