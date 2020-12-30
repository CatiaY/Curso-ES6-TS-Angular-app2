import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

// Para a internacionalização da moeda:
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common'
import localePtBr from '@angular/common/locales/pt'
registerLocaleData(localePtBr);

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.route'

// Importação do pipe
import { DescricaoReduzida } from './util/descricao-reduzida.pipe';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component'

// Para o uso de Template Forms
//import { FormsModule } from '@angular/forms'
// Para o uso de Reactive Forms
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';

// Serviço de gerenciamento do carrinho de compras. Adicionar em providers do @NgModule
// Obs.: Em app.module, NÃO utilizar exportação default para importação de serviços, pois provocará a instância da classe e gerará erro
import { CarrinhoService } from './carrinho.service'
import { OrdemCompraService } from './ordem-compra.service'


@NgModule({
  declarations: [
    AppComponent,    
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }), // Mapeamento global para a aplicação. RouterModule.forChild(ROUTES) é o mapeamento para rotas internas de componentes
    //FormsModule,
    ReactiveFormsModule
  ],
  // Obs.: CarrinhoService é o mesmo que { provide: CarrinhoService, useValue: CarrinhoService }. provide é o serviço em questão e useValue é uma referência àquele serviço
  providers: [ CarrinhoService, OrdemCompraService, { provide: LOCALE_ID, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})

export class AppModule { }