import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../../types/estado';
import { Municipio } from '../../types/municipio';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  private apiViaCepEstados = environment.apiViaCepEstados;
  private apiViaCepMunicipios = environment.apiViaCepMunicipios;

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiViaCepEstados);
  }

  getMunicipios(estado: string): Observable<Municipio[]> {
    const url = this.apiViaCepMunicipios.replace('{siglaUF}', estado);
    return this.http.get<Municipio[]>(url);
  }
}
