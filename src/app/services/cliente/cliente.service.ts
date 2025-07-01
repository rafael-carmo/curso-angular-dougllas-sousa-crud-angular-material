import { Injectable } from '@angular/core';
import { Cliente } from '../../components/cadastro/cliente';
import { Observable } from 'rxjs';

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

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  pesquisarClientes(filter: string): Cliente[] {
    const clientes = this.obterStorage();
    if (!filter) {
      return clientes; // Retorna todos os clientes se um valor não for fornecido
    }
    // Filtra os clientes pelo nome ou email (case-insensitive)
    return clientes.filter(cliente => cliente.nome?.toLowerCase().includes(filter.toLowerCase())
                                   || cliente.email?.toLowerCase().includes(filter.toLowerCase()));
  }

  excluirCliente(id: string): Observable<void> {
    // Aqui você pode adicionar a lógica para excluir o cliente, como enviar uma solicitação para um serviço ou API.
    // console.log(`Cliente com ID ${id} excluído.`);
    // this.removerClienteDoStorage(id);
    const clientes = this.obterStorage();

    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      clientes.splice(index, 1); // Remove o cliente do array
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes)); // Atualiza o armazenamento local
      return new Observable<void>(subscriber => {
        subscriber.next(); // Emite um objeto Cliente com o ID excluído
        subscriber.complete();
      });
    } else {
      console.error(`Cliente com ID ${id} não encontrado.`);
      return new Observable<void>(subscriber => {
        subscriber.error(new Error(`Cliente com ID ${id} não encontrado.`));
        subscriber.complete();
      });
    }
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
