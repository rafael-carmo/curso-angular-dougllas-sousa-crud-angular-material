import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from './cliente';
import { CommonModule } from "@angular/common";
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  atualizando: boolean = false;

  cliente: Cliente = Cliente.newCliente();

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    console.log('ID do cliente recebido:', id);
    if (id) {
      let clienteEncontrado = this.clienteService.buscarClientePorId(id);
      if (clienteEncontrado) {
        this.atualizando = true;
        this.cliente = clienteEncontrado;
      }
    } else {
      this.atualizando = false;
      this.cliente = Cliente.newCliente();
      console.log('Novo cliente:', this.cliente);
    }
  }

  salvar() {
    this.clienteService.salvar(this.cliente);
    this.router.navigate(['/consulta']);
  }
}
