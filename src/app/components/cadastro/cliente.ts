import { v4 as uuid} from "uuid";

export class Cliente {
  id?: string;
  nome?: string;
  cpf?: string;
  dataNascimento?: Date | null;
  email?: string;
  urlImage?: string;
  estado?: string;
  municipio?: string;

  constructor(nome: string, cpf: string, dataNascimento: Date | null, email: string, urlImage: string, estado: string, municipio: string) {
    this.id = uuid();

    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.urlImage = urlImage;
    this.estado = estado;
    this.municipio = municipio;
  }

  static newCliente() {
    //Como o professor fez
    // const cliente = new Cliente();
    // cliente.id = uuid();
    // return cliente;

    //Como eu fiz
    return new Cliente('', '', null, '', '', '', '');
  }
}
