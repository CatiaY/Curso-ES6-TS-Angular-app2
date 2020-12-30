class ItemCarrinho {
    constructor (
        public id: number,
        public img: object,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ) {}
}

export { ItemCarrinho } // Como não é um export default, precisa de chaves para indicar os elementos a serem exportados