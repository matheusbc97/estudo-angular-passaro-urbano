import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.services';
import {CarrinhoService} from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  providers: [OfertasService],
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ofertasService.getOfertasPorId(params.id).subscribe((oferta) => {
        this.oferta = oferta;
      });
    });
  }

  public adicionarItemCarrinho(oferta: Oferta): void {
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
  }
}
