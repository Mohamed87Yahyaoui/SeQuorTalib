import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnseignant } from 'app/shared/model/enseignant.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EnseignantService } from './enseignant.service';
import { EnseignantDeleteDialogComponent } from './enseignant-delete-dialog.component';

@Component({
  selector: 'jhi-enseignant',
  templateUrl: './enseignant.component.html'
})
export class EnseignantComponent implements OnInit, OnDestroy {
  enseignants: IEnseignant[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected enseignantService: EnseignantService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.enseignants = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.enseignantService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IEnseignant[]>) => this.paginateEnseignants(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.enseignants = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEnseignants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEnseignant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEnseignants(): void {
    this.eventSubscriber = this.eventManager.subscribe('enseignantListModification', () => this.reset());
  }

  delete(enseignant: IEnseignant): void {
    const modalRef = this.modalService.open(EnseignantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.enseignant = enseignant;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateEnseignants(data: IEnseignant[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.enseignants.push(data[i]);
      }
    }
  }
}
