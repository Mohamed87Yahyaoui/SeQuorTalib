import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HistoriqueEtudiantFiliereService } from './historique-etudiant-filiere.service';
import { HistoriqueEtudiantFiliereDeleteDialogComponent } from './historique-etudiant-filiere-delete-dialog.component';

@Component({
  selector: 'jhi-historique-etudiant-filiere',
  templateUrl: './historique-etudiant-filiere.component.html'
})
export class HistoriqueEtudiantFiliereComponent implements OnInit, OnDestroy {
  historiqueEtudiantFilieres: IHistoriqueEtudiantFiliere[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected historiqueEtudiantFiliereService: HistoriqueEtudiantFiliereService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.historiqueEtudiantFilieres = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.historiqueEtudiantFiliereService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IHistoriqueEtudiantFiliere[]>) => this.paginateHistoriqueEtudiantFilieres(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.historiqueEtudiantFilieres = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoriqueEtudiantFilieres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoriqueEtudiantFiliere): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoriqueEtudiantFilieres(): void {
    this.eventSubscriber = this.eventManager.subscribe('historiqueEtudiantFiliereListModification', () => this.reset());
  }

  delete(historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere): void {
    const modalRef = this.modalService.open(HistoriqueEtudiantFiliereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historiqueEtudiantFiliere = historiqueEtudiantFiliere;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHistoriqueEtudiantFilieres(data: IHistoriqueEtudiantFiliere[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.historiqueEtudiantFilieres.push(data[i]);
      }
    }
  }
}
