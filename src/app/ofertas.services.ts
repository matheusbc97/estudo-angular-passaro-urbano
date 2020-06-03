import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Oferta} from './shared/oferta.model'

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) { }


  public getOfertas(){
    return this.http.get<Oferta[]>('http://localhost:3000/ofertas?destaque=true')
  }
}
