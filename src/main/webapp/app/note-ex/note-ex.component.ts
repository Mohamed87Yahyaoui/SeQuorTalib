import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-note-ex',
  templateUrl: './note-ex.component.html',
  styleUrls: ['./note-ex.component.scss']
})
export class NoteExComponent implements OnInit {
  semestre1 = false;
  semestre2 = false;
  semestre3 = false;
  semestre4 = false;
  semestre5 = false;
  semestre6 = false;

  constructor() {}

  ngOnInit(): void {}
}
