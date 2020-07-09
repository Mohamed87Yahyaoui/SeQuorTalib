import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SequortalibTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { HistoriqueEtudiantFiliereDeleteDialogComponent } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere-delete-dialog.component';
import { HistoriqueEtudiantFiliereService } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.service';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantFiliere Management Delete Component', () => {
    let comp: HistoriqueEtudiantFiliereDeleteDialogComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantFiliereDeleteDialogComponent>;
    let service: HistoriqueEtudiantFiliereService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantFiliereDeleteDialogComponent]
      })
        .overrideTemplate(HistoriqueEtudiantFiliereDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueEtudiantFiliereDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEtudiantFiliereService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
