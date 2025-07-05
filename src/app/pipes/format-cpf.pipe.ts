import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'formatCpf'})
export class FormatCpfPipe implements PipeTransform {
  transform(cpf: string | undefined | null): string {
    if (!cpf) return '';

    // Remove tudo que não for dígito
    const digitsOnly = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos (CPF válido)
    if (digitsOnly.length !== 11) return cpf; // Retorna sem formatação se inválido

    // Formata: XXX.XXX.XXX-XX
    return digitsOnly.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
  }
}
// Usage in template: {{ cliente.cpf | formatCpf }}
// Usage in component: this.formatCpfPipe.transform(cliente.cpf);
