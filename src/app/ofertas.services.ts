import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Oferta} from './shared/oferta.model';
import {retry} from 'rxjs/operators';

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) { }

  public getOfertas(){
    return this.http.get<Oferta[]>('ofertas?destaque=true');
  }

  public getOfertasPorCategoria(categoria: string){
    return this.http.get<Oferta[]>(`ofertas?categoria=${categoria}`);
  }

  public getOfertasPorId(id: number){
    return this.http.get<Oferta>(`ofertas/${id}`);
  }

  public getComoUsarOfertaPorId(id: number){
    return this.http.get<{id: number; descricao: string}>(`como-usar/${id}`);
  }

  public getOndeFicaOfertaPorId(id: number){
    return this.http.get<{id: number; descricao: string}>(`onde-fica/${id}`);
  }

  public pesquisaOfertas(termo: string){
    return this.http.get<Oferta[]>(`ofertas?descricao_oferta_like=${termo}`)
      .pipe(
        retry(10)
      );
  }
}
