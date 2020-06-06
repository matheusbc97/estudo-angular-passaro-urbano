import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CarrinhoService} from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[];

  public formulario: FormGroup = new FormGroup({
    endereco: new  FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    numero: new  FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    complemento: new  FormControl(null),
    formaDePagamento: new  FormControl(null, [Validators.required]),
  });

  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService,
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log('ll', this.itensCarrinho);
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID'){
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaDePagamento').markAsTouched();

      return;
    }

    if (this.carrinhoService.exibirItens().length === 0){
      alert('Você não selecionou nenhum item!');

      return;
    }

    const {endereco, numero, complemento, formaDePagamento} = this.formulario.value;
    const pedido = new Pedido(
      endereco,
      numero,
      complemento,
      formaDePagamento,
      this.carrinhoService.exibirItens()
    );

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe(response => {
        this.idPedidoCompra = response.id;
        this.carrinhoService.limparCarrinho();
      });

    return;
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
}
