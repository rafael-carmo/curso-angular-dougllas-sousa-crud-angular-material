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
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { ConfirmarExclusaoDialogComponent } from '../confirmar-exclusao-dialog/confirmar-exclusao-dialog.component';

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
    MatDialogModule,
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
              private dialog: MatDialog,
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

  confirmarExclusao(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmação de Exclusão',
        message: `Você tem certeza que deseja excluir o cliente ${cliente.nome}?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.excluirCliente(cliente.id!);
        this.carregarClientes();
      }
    });
  }

  excluirCliente(id: string): void {
    this.clienteService.excluirCliente(id).subscribe({
      next: () => {
        console.log(`Cliente com ID ${id} excluído com sucesso.`);
        this.carregarClientes();
      },
      error: (error) => {
        console.error('Erro ao excluir cliente:', error);
      }
    });
  }
}
