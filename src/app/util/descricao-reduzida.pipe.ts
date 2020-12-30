// Não é obrigatório, mas é uma boa prática usar a interface PipeTransform:
import { Pipe, PipeTransform } from '@angular/core'

// Recebe a string, trunca ela na x-ésima posição e concatena ela com "..."
@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    
    // Recebe o dado que será tratado
    transform(texto: string, truncarEm: number): string {
        // Verifica se a string possui mais de 15 posições
        if (texto.length > truncarEm) {
            // Retorna a string truncada, concatenada com reticências
            // substr() recebe a primeira e a última posição da string
            return texto.substr(0, truncarEm) + '...'
        }
        
        // else
        return texto
    }
}