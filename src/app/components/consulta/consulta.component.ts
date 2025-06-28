import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  displayedColumns: string[] = ['urlImage', 'id', 'nome', 'email', 'cpf', 'dataNascimento', 'acoes'];
  clientes: Cliente[] = [];
  filter: string = '';

  constructor(private clienteService: ClienteService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clientes = this.clienteService.pesquisarClientes('');
    console.table(this.clientes);
  }

  // IMPLEMENTAR ESTE METODO PARA BUSCAR CLIENTES AO DIGITAR NO INPUT E NÃO APENAS AO CLICAR NO BOTÃO
  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.clientes = this.clienteService.pesquisarClientes(filterValue);
  // }

  pesquisarClientes(): void {
    this.clientes = this.clienteService.pesquisarClientes(this.filter);
    console.table(this.clientes);
  }

  prepararEditar(id: string): void {
    this.router.navigate(['/cadastro'], {
      queryParams: { id }
    });
  }
}
