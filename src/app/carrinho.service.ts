import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

class CarrinhoService {
    public itens: ItemCarrinho[] = [] // array vazio

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        //console.log('Oferta recebida no serviço', oferta)

        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1 // Quantidade de itens inclusos no carrinho
        )
        //console.log('Item no carrinho: ', itemCarrinho)

        // Verifica se o item em questão já não existe dentro de this.itens
        // find() age como se estivesse em um looping, e retorna a referência ao objeto repetido encontrado        
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => {            
            if(item.id === itemCarrinho.id)
                return item
        })
        
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        }
        else {
            // Inclui itemCarrinho dentro do array itens
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompras (): number {
        let total: number = 0

        // map() percorre cada item do array
        this.itens.map((item: ItemCarrinho) => {
            total += item.valor * item.quantidade
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        
        // Incrementar a quantidade de itens no carrinho
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => {            
            if(item.id === itemCarrinho.id)
                return item
        })
        
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        }        
    }

    public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {
        
        // Subtrair a quantidade de itens no carrinho
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => {            
            if(item.id === itemCarrinho.id)
                return item
        })
        
        if(itemCarrinhoEncontrado && itemCarrinhoEncontrado.quantidade > 0){
            itemCarrinhoEncontrado.quantidade -= 1            
        }        
    }

    public removerItem(itemCarrinho: ItemCarrinho): void {        
        
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => {            
            if(item.id === itemCarrinho.id)
                return item
        })

        if(itemCarrinhoEncontrado) {
            // splice() recorta/remove o índice indicado e entrega o item correspondente, que deixa de existir dentro do array. O segundo parâmetro é a quantidade de elementos que serão removidos
            this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
        }        
    }

    // Esvazia o carrinho
    public limparCarrinho(): void {
        this.itens = []
    }
}

// Não pode usar exportação default, pois está instanciado em app.module
export { CarrinhoService }