import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { Cliente } from './cliente';
import { CommonModule } from "@angular/common";
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { Estado } from '../../types/estado';
import { BrasilApiService } from '../../services/brasilapi/brasil-api.service';
import { Municipio } from '../../types/municipio';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  atualizando: boolean = false;
  cliente: Cliente = Cliente.newCliente();
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(private clienteService: ClienteService,
              private brasilApiService: BrasilApiService,
              private route: ActivatedRoute,
              private router: Router,) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      let clienteEncontrado = this.clienteService.buscarClientePorId(id);
      if (clienteEncontrado) {
        this.atualizando = true;
        this.cliente = clienteEncontrado;
      }
    } else {
      this.atualizando = false;
      this.cliente = Cliente.newCliente();
    }

    // Carrega os estados ao iniciar o componente
    this.carregarEstados();
    // Se já houver um estado selecionado, carrega os municípios correspondentes
    if (this.cliente.estado) {
      this.carregaMunicipios(this.cliente.estado);
    }

    //Solução do professor
    //ele manteve um unico metodo para carregar os municipios
    // if (this.cliente.estado) {
    //   const event = { value: this.cliente.estado } as MatSelectChange;
    //   this.carregaMunicipiosEvent(event);
    // }



  }

  salvar() {
    this.clienteService.salvar(this.cliente).subscribe({
      next: (cliente) => {
        this.router.navigate(['/consulta'], { queryParams: {
          message: 'Cliente salvo com sucesso!',
          result: 'success',
        } });
      },
      error: (error) => {
        this.router.navigate(['/consulta'], { queryParams: {
          message: 'Erro ao salvar cliente. Por favor, tente novamente.',
          result: 'error',
        } });
      }
    });
  }

  carregarEstados(): void {
    this.brasilApiService.getEstados().subscribe({
      next: (estadosCarregados) => {
        this.estados = estadosCarregados;
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
      }
    });
  }

  carregaMunicipiosEvent(event: MatSelectChange): void {
    const estadoSelecionado = event.value;
    this.carregaMunicipios(estadoSelecionado);
  }

  carregaMunicipios(uf: string): void {
    if (uf) {
      this.brasilApiService.getMunicipios(uf).subscribe({
        next: (municipiosCarregados) => {
          this.municipios = municipiosCarregados;
        },
        error: (error) => {
          console.error('Erro ao carregar municípios:', error);
        }
      });
    } else {
      this.municipios = []; // Limpa a lista de municípios se nenhum estado for selecionado
    }
  }

}

