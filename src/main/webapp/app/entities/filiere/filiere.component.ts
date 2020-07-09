import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFiliere } from 'app/shared/model/filiere.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { FiliereService } from './filiere.service';
import { FiliereDeleteDialogComponent } from './filiere-delete-dialog.component';

@Component({
  selector: 'jhi-filiere',
  templateUrl: './filiere.component.html'
})
export class FiliereComponent implements OnInit, OnDestroy {
  filieres: IFiliere[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected filiereService: FiliereService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.filieres = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.filiereService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IFiliere[]>) => this.paginateFilieres(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.filieres = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFilieres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFiliere): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFilieres(): void {
    this.eventSubscriber = this.eventManager.subscribe('filiereListModification', () => this.reset());
  }

  delete(filiere: IFiliere): void {
    const modalRef = this.modalService.open(FiliereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.filiere = filiere;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateFilieres(data: IFiliere[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.filieres.push(data[i]);
      }
    }
  }
}
