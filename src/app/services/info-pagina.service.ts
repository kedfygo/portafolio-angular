import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any;

  constructor( private _http: HttpClient) {
    console.log('Servicio Listo');
    this.cargarEquipo();

    // Leer el archvivo JSON
    this._http.get('assets/data/data-pagina.json')
              .subscribe((resp: InfoPagina) => {
                this.cargada = true;
                this.info = resp;
                console.log(resp);
                // console.log(resp['twitter']);

              });
  }

  private cargarInfo(){
    this._http.get('assets/data/data-pagina.json')
              .subscribe((resp: InfoPagina) => {
                this.cargada = true;
                this.info = resp;

              });



  }

  private cargarEquipo() {
    this._http.get('https://angular-html-fdef1.firebaseio.com/equipo.json')
              .subscribe((resp: any[] ) => {
                this.equipo = resp;
                console.log(resp);

              });
  }
}
