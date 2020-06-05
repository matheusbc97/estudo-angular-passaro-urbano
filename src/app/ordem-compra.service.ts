import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pedido } from './shared/pedido.model';

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient) {}

   public efetivarCompra(pedido: Pedido) {

        const headers = new HttpHeaders();

        headers.append('Content-type', 'application/json');

        return this.http.post(
            `pedidos`,
            pedido,
            {
              headers
            }
        );
    }
}
