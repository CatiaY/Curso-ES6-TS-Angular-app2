import { Routes } from '@angular/router'

// Importar todos os componentes que serão associados às rotas
import { HomeComponent} from './home/home.component'
import { RestaurantesComponent} from './restaurantes/restaurantes.component'
import { DiversaoComponent} from './diversao/diversao.component'
import { OfertaComponent } from './oferta/oferta.component'
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component'
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component'
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component'

// Constante ROUTES será responsável por ter uma mapa associando paths com componentes específicos
export const ROUTES: Routes = [    
    // Indicar path e componente associado
    { path: '', component: HomeComponent },  // path raiz
    { path: 'restaurantes', component: RestaurantesComponent }, // path restaurantes da url http://localhost:4200/restaurantes
    { path: 'diversao', component: DiversaoComponent },  // path diversao da url http://localhost:4200/diversao
    { path: 'oferta', component: HomeComponent }, // Se nenhum id for enviado à página de oferta, voltará para a página Home
    { path: 'oferta/:id', component: OfertaComponent, // Para indicar ao path oferta como receber e identificar parâmetros. Essa rota é necessária pois cada path possui uma assinatura única
    // Indicação das rotas filhas dentro de um array
    children: [
        { path: '', component: ComoUsarComponent }, // Default
        { path: 'como-usar', component: ComoUsarComponent },
        { path: 'onde-fica', component: OndeFicaComponent }
    ] },
    { path: 'ordem-compra', component: OrdemCompraComponent}

    // Obs.: path = caminho definido na url. Ex.: restaurantes é o path da url http://localhost:4200/restaurantes.
]