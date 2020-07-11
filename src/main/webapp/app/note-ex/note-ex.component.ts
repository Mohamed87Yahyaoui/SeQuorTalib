import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'app/layouts/navbar/navbar.component';

@Component({
  selector: 'jhi-note-ex',
  templateUrl: './note-ex.component.html',
  styleUrls: ['./note-ex.component.scss']
})
export class NoteExComponent implements OnInit {
  Simosemestre1 = false;
  Simosemestre2 = false;
  Simosemestre3 = false;
  Simosemestre4 = false;

  public MeryemSemestre1 = false;
  MeryemSemestre2 = false;
  MeryemSemestre3 = false;
  MeryemSemestre4 = false;
  MeryemSemestre5 = false;
  MeryemSemestre6 = false;

  rachidSemestre1 = false;
  rachidSemestre2 = false;

  constructor(public nav: NavbarComponent) {}

  ngOnInit(): void {}
}
