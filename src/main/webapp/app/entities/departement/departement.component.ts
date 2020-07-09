import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartement } from 'app/shared/model/departement.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DepartementService } from './departement.service';
import { DepartementDeleteDialogComponent } from './departement-delete-dialog.component';

@Component({
  selector: 'jhi-departement',
  templateUrl: './departement.component.html'
})
export class DepartementComponent implements OnInit, OnDestroy {
  departements: IDepartement[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected departementService: DepartementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.departements = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.departementService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDepartement[]>) => this.paginateDepartements(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.departements = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartements(): void {
    this.eventSubscriber = this.eventManager.subscribe('departementListModification', () => this.reset());
  }

  delete(departement: IDepartement): void {
    const modalRef = this.modalService.open(DepartementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.departement = departement;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDepartements(data: IDepartement[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.departements.push(data[i]);
      }
    }
  }
}
