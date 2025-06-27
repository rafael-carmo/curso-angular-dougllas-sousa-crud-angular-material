import { Component } from '@angular/core';
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
export class CadastroComponent {
  cliente: Cliente = Cliente.newCliente();

  constructor(private clienteService: ClienteService) { }

  salvar() {
    this.clienteService.salvar(this.cliente);
  }
}
