import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  // Variável para receber o Observable que retorna a pesquisa
  public ofertas: Observable<Oferta[]> 

  // Subject receberá como parâmetro o termo da pesquisa e vai encaminhá-lo, a partir do switchMap, para o Observable que irá efetuar a pesquisa
  private subjectPesquisa: Subject<string> = new Subject<string>()

  @ViewChild('termoDaPesquisa') public termoDaPesquisa: any

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    
    this.ofertas = this.subjectPesquisa // retorna um Observable de Oferta[]
    .pipe( 
      // Debounce time faz com que os próximos eventos sejam chamados após o decurso de um tempo
      debounceTime(1000),  // 1 segundo
      // distinctUntilChanged faz com q a pesquisa somente seja realizada se o termo for diferente da pesquisa anterior
      distinctUntilChanged(),
      // switchMap será chamado sempre que o next de subjectPesquisa for disparado, recebendo o termo da busca (termo)
      // Ele sequencia a execução dos Observables recebidos (conforme o usuário digita o texto) de tal modo que quando novos Observables forem produzidos, ele vai cancelando a inscrição dos anteriores e mantém somente a do último    
      switchMap((termo: string) => {        
        // Chama o Observable de ofertasService somente se o termo não for uma string vazia
        // trim() elimina espaços em branco dos lados
        if(termo.trim() === '') {
          // retornar um Observable vazio do tipo array de Oferta, que recebe vazio
          return of<Oferta[]>([])
        }
        
        return this.ofertasService.pesquisaOfertas(termo)        
      }),
      // Para pegar erros
      catchError ((erro: any) => {
        console.log(erro)
        // Retorna o objeto esperado pelo subscriber para que a aplicação não quebre
        return of<Oferta[]>([]) 
      })
    )    
  }
  
  // 1) Esse método é chamado pelo event binding keyup() do template.
  // 2) subjectPesquisa envia o termoDaBusca para o switchMap
  // Pesquisa usando Observables Subject e switchMap
  public pesquisa (termoDaBusca: string) : void { 
    
    console.log('keyup caracter: ', termoDaBusca)

    // Observable Subject atua como proxy, ou seja, como observador e observável ao mesmo tempo
    this.subjectPesquisa.next(termoDaBusca)
  }

  // Limpa o menu de pesquisa, enviando uma string de pesquisa vazia, que cairá dentro do if(termo.trim() === '')
  public limpaPesquisa(): void {    
    this.subjectPesquisa.next('')    
  }
}
