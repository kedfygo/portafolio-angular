import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private _http: HttpClient ) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise( (resolve, reject )=>{
      this._http.get('https://angular-html-fdef1.firebaseio.com/productos_idx.json')
              .subscribe((resp: ProductoInterface[]) => {
                this.productos = resp;
                this.cargando = false;
                resolve();
              });

    });

  }

  getProducto(id: string ) {
    return this._http.get(`https://angular-html-fdef1.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar después de cargar los productos
        // Aplicar filtro
        this.filtrarProducto( termino );

      });
    }else {
        // Aplicar filtro
        this.filtrarProducto( termino );

      }

    }

  private filtrarProducto(termino: string) {
    //console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }

    });

  }


}



