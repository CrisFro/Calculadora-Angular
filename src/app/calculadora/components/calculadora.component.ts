import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar();
  }
  /** 
  * Inicializa todos os operadores para os valores padrão.
  * @return void
  */
  limpar(): void {
    this.numero1 = '0'; //inicializa com 0
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   * @param string numero
   * @return void
   */
  adicionarNumero(numero: string): void {
    if (this.operacao === null) { //se a operação for vazia(sem operação ainda)
      this.numero1 = this.concatenarNumero(this.numero1, numero); //digito o número 1
    } else { //caso contrário, se possuir operação...
      this.numero2 = this.concatenarNumero(this.numero2, numero); //entro com o número 2
    }
  }

  /**
   * Retorna o valor concatenado. Trata o separador decimal.
   * 
   * @param string numAtual
   * @param string numConcat
   * @return string
   */
  concatenarNumero(numAtual: string, numConcat: string): string {
    //caso contenha apenas '0' ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }

    // primeiro dígito é '.', concatena '0' antes do ponto
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }

    //caso '.' digitado e já contenha um '.', apenas retorna
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    return numAtual + numConcat;
  }

  /**
   * Executa a lógica quando um operador for selecionado. 
   * Caso ja possua uma operação selecionada, executa a operação anterior, e define a nova operação.
   * 
   * @param string operacao
   * @return void
   */

  definirOperacao(operacao: string): void {
    //a penas define a operação caso não exista uma
    if (this.operacao === null) { // se a operação for nula...
      this.operacao = operacao; // atribuo à operação
      return;
    }

    // caso operação definida e número 2 sejam selecionados, efetua o cálculo da operação
    if (this.numero2 !== null) { // se o número2 for diferente de nulo...
      this.resultado = this.calculadoraService.calcular( // chama o método calcular...
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  /**
   * Efetua o cálculo de uma operação
   * 
   * @return void
   */
  calcular(): void {
    if (this.numero2 === null) { // verifica se o número2 é igual a nulo
      return;
    }

    this.resultado = this.calculadoraService.calcular( // chama o resultado
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * 
   * @return string
   */
  get display(): string { //método utilizado para exibir na tela o valor corrente
    if (this.resultado !== null) { // caso eu tenha um resultado...
      return this.resultado.toString(); // exibe o resultado
    }
    if (this.numero2 !== null) { // caso eu tenha o numero2 e seja diferente de nulo...
      return this.numero2; // exibo o número2
    }
    return this.numero1; // caso contrário exibe o número1.
  }
}

