import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-smi-etudiants',
  templateUrl: './smi-etudiants.component.html',
  styleUrls: ['./smi-etudiants.component.scss']
})
export class SmiEtudiantsComponent implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  notemohamed = false;
  notemohameds1 = false;
  notemohameds2 = false;
  notemohameds3 = false;
  notemohameds4 = false;

  etudiants = [
    {
      code: '487655',
      nom: 'Yahyaoui',
      prenom: 'Mohamed',
      semestre: '5',
      section: 'A'
    }
  ];

  chartOptionsmohamed = {
    legend: {
      display: false
    },
    scale: {
      angleLines: {
        display: false
      },
      pointLabels: {
        fontColor: 'white'
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 20
      },
      gridLines: {
        color: ['cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan']
      }
    }
  };
  chartDatamohamed = [{ data: [13.77, 18, 9.98, 10] }];
  chartLabelsmohamed = ['S1', 'S2', 'S3', 'S4'];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }

  shownotemohamed(): void {
    this.notemohamed = true;
    this.router.navigateByUrl('/noteSMI');
  }

  shownotemohameds1(): void {
    this.notemohameds1 = true;
    this.notemohameds2 = false;
    this.notemohameds3 = false;
    this.notemohameds3 = false;
    this.notemohameds4 = false;
    this.router.navigateByUrl('/noteSMI');
  }

  shownotemohameds2(): void {
    this.notemohameds2 = true;
    this.notemohameds1 = false;
    this.notemohameds3 = false;
    this.notemohameds4 = false;
    this.router.navigateByUrl('/noteSMI');
  }

  shownotemohameds3(): void {
    this.notemohameds3 = true;
    this.notemohameds1 = false;
    this.notemohameds2 = false;
    this.notemohameds4 = false;
    this.router.navigateByUrl('/noteSMI');
  }

  shownotemohameds4(): void {
    this.notemohameds4 = true;
    this.notemohameds1 = false;
    this.notemohameds2 = false;
    this.notemohameds3 = false;
    this.router.navigateByUrl('/noteSMI');
  }
}
