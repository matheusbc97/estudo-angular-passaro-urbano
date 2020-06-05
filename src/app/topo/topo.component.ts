import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';

import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss'],
  providers: [OfertasService],
})
export class TopoComponent implements OnInit {
  public ofertasObservable: Observable<Oferta[]>;
  //public ofertas: Oferta[];

  private subjectPesquisa = new Subject<string>();

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.ofertasObservable = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termoDaBusca) => {
        if (termoDaBusca.trim() === '') {
          return of<Oferta[]>([]);
        }

        return this.ofertasService.pesquisaOfertas(termoDaBusca);
      }),
      catchError((err) => {
        return of<Oferta[]>([]);
      })
    );

    //this.ofertasObservable.subscribe((ofertas) => (this.ofertas = ofertas));
  }

  public pesquisa(termoDaBusca: string) {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
