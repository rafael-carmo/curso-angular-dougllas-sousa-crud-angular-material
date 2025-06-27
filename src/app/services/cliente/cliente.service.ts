import { Injectable } from '@angular/core';
import { Cliente } from '../../components/cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  salvar(cliente: Cliente): void {
    // Aqui você pode adicionar a lógica para salvar o cliente, como enviar os dados para um serviço ou API.
    console.log('Cliente salvo:', cliente);
    const clientes = this.obterStorage();
    const index = clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      clientes[index] = cliente; // Atualiza o cliente existente
    }
    else {
      //cliente.id = uuid(); // Gera um ID único baseado no timestamp
      clientes.push(cliente); // Adiciona um novo cliente
    }

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  pesquisarClientes(nome: string): Cliente[] {
    const clientes = this.obterStorage();
    return clientes;
  }

  private obterStorage(): Cliente[] {
    const clientesJson = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (clientesJson) {
      return JSON.parse(clientesJson);
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
