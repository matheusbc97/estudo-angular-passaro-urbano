import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
  public itens: ItemCarrinho[] = [];

  public exibirItens(): ItemCarrinho[]{
    return this.itens;
  }

  public incluirItem(oferta: Oferta): void{
    const itemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );

    const  itemCarrinhoEncontrado = this.itens.find((item) => item.id === itemCarrinho.id);

    if (itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade++;
    }else{
      this.itens.push(itemCarrinho);
    }

  }

  public totalCarrinhoCompras(): number {
    let total = 0;

    this.itens.map(item => {
      total += (item.valor * item.quantidade);
    });

    return  total;
  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    const itenCarrinhoEncontrado = this.itens.find(item => item.id === itemCarrinho.id);

    if (itenCarrinhoEncontrado){
      itenCarrinhoEncontrado.quantidade++;
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void{

    const itenCarrinhoEncontradoIdx = this.itens.findIndex(item => item.id === itemCarrinho.id);

    const itemCarrinhoEncontrado = this.itens[itenCarrinhoEncontradoIdx];

    if (itenCarrinhoEncontradoIdx !== -1){
      itemCarrinhoEncontrado.quantidade--;

      if (itemCarrinhoEncontrado.quantidade === 0){
        this.itens.splice(itenCarrinhoEncontradoIdx, 1);
      }
    }
  }

  public limparCarrinho(): void{
    this.itens = [];
  }
}

export {CarrinhoService};
