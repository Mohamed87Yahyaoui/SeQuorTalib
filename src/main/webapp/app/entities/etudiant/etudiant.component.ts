import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEtudiant } from 'app/shared/model/etudiant.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EtudiantService } from './etudiant.service';
import { EtudiantDeleteDialogComponent } from './etudiant-delete-dialog.component';
import { Router } from '@angular/router';

import { JhiLanguageService } from 'ng-jhipster';

@Component({
  selector: 'jhi-etudiant',
  templateUrl: './etudiant.component.html'
})
export class EtudiantComponent implements OnInit, OnDestroy {
  etudiants: IEtudiant[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  nondiplome = false;
  diplome = false;
  trifiliere = false;

  smia = false;
  smi = false;
  sma = false;
  smpc = false;
  smp = false;
  smc = false;
  svt = false;
  svu = false;
  svi = false;

  constructor(
    protected etudiantService: EtudiantService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    private router: Router,
    private languageService: JhiLanguageService
  ) {
    this.etudiants = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.etudiantService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IEtudiant[]>) => this.paginateEtudiants(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.etudiants = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEtudiants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEtudiant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEtudiants(): void {
    this.eventSubscriber = this.eventManager.subscribe('etudiantListModification', () => this.reset());
  }

  delete(etudiant: IEtudiant): void {
    const modalRef = this.modalService.open(EtudiantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etudiant = etudiant;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateEtudiants(data: IEtudiant[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.etudiants.push(data[i]);
      }
    }
  }

  shownetddiplome(): void {
    this.diplome = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsmia(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.smia = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsmi(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.smi = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsma(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.sma = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsmpc(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.smpc = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsmp(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.smp = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsmc(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.smc = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsvt(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.svt = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsvi(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.svi = true;
    this.router.navigateByUrl('/etudiant');
  }

  showsvu(): void {
    this.diplome = false;
    this.trifiliere = true;
    this.svu = true;
    this.router.navigateByUrl('/etudiant');
  }
}
