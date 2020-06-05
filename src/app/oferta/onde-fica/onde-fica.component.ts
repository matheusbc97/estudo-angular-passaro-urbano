import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.services';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.scss'],
})
export class OndeFicaComponent implements OnInit {
  public ondeFica = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.ofertasService
        .getOndeFicaOfertaPorId(this.route.parent.snapshot.params['id'])
        .subscribe((ondeFica) => (this.ondeFica = ondeFica.descricao));
    });
  }
}
