import { Oferta } from './shared/oferta.model'
import firebase from 'firebase'

export class OfertasService {
    
    public ofertas: Array<Oferta>

    constructor(){}

    // Recupera as ofertas do database do firebase
    // Obs.: No firebase, os arquivos armazenados no storage ficam protegidos e não podem ser acessados diretamente. É necessário fazer o download da url que contém o token válido de acesso de cada um daqueles arquivos
    public getOfertas(): Promise<Oferta[]> {

        return new Promise((resolve, reject) => {
            // Obs.: Essa consulta é uma Promise
            // Consulta as ofertas em database
            firebase.database().ref('/ofertas') // Envio da referência para consulta            
                // Método once() faz uma única consulta no momento em que o método é  executado (similar a um snapshot/foto do momento atual do path)                
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    this.ofertas = snapshot.val()                    
                    resolve(this.ofertas)
                })
                .catch((error: Error) => {console.log(error)})                
        })
    }


    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {

        return new Promise((resolve, reject) => {
            // Obs.: Essa consulta é uma Promise
            // Consulta as ofertas em database
            firebase.database().ref('/ofertas') // Envio da referência para consulta                            
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    this.ofertas = snapshot.val() 
                    resolve(this.ofertas.filter(oferta => oferta.categoria === categoria))
                })
                .catch((error: Error) => {console.log(error)})            
        })        
    }


    public getOfertaPorId(id: number): Promise<Oferta> {        
                
        return new Promise((resolve, reject) => {
            // Obs.: Essa consulta é uma Promise
            // Consulta as ofertas em database
            firebase.database().ref('/ofertas') // Envio da referência para consulta                            
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    this.ofertas = snapshot.val()
                    let oferta = this.ofertas.find(oferta => oferta.id == id)

                    resolve(oferta)
                })
                .catch((error: Error) => {console.log(error)})                
        })            
    }


    public getComoUsarOfertaPorId(id: number): Promise<string> {

        return new Promise((resolve, reject) => {            
            firebase.database().ref('/como-usar') // Envio da referência para consulta                            
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    let comoUsar = (snapshot.val()).find(descricao => descricao.id == id)                    
                    resolve(comoUsar.descricao)
                })
                .catch((error: Error) => {console.log(error)})                
        })             
    }


    public getOndeFicaOfertaPorId(id: number): Promise<string> {

        return new Promise((resolve, reject) => {            
            firebase.database().ref('/onde-fica') // Envio da referência para consulta                            
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    let ondeFica = (snapshot.val()).find(descricao => descricao.id == id)                    
                    resolve(ondeFica.descricao)
                })
                .catch((error: Error) => {console.log(error)})                
        })  
    }


    // Recebe um termo de busca para pesquisar as ofertas do banco de dados    
    public pesquisaOfertas (termo: string): Promise<Oferta[]> {

        return new Promise((resolve, reject) => {            
            firebase.database().ref('/ofertas') // Envio da referência para consulta                            
                .once('value') // Evento que será escutado
                .then((snapshot: any) => {
                    let ofertas = (snapshot.val()).filter(descricao => (descricao.descricao_oferta.toLowerCase()).includes(termo.toLowerCase()))                    
                    resolve(ofertas)
                })
                .catch((error: Error) => {console.log(error)})                
        }) 
    }
}