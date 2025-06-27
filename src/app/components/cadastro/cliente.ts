import { v4 as uuid} from "uuid";

export class Cliente {
  id?: string;
  nome?: string;
  cpf?: string;
  dataNascimento?: Date;
  email?: string;

  constructor(nome: string, cpf: string, dataNascimento: Date, email: string  ) {
    this.id = uuid();

    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.email = email;
  }

  static newCliente() {
    //Como o professor fez
    // const cliente = new Cliente();
    // cliente.id = uuid();
    // return cliente;

    //Como eu fiz
    return new Cliente('', '', new Date(), '');
  }
}
