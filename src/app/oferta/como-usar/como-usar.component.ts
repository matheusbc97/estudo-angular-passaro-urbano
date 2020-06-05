import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.services';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.scss'],
})
export class ComoUsarComponent implements OnInit {
  public comoUsar = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.ofertasService.getComoUsarOfertaPorId(params.id).subscribe(
        (data) => (this.comoUsar = data.descricao),
        (error) => console.log('Erro status:', error.status)
      );
    });
  }
}
