export class ProductModel{
    constructor(
        public id: number,
        public name :string,
        public price :number,
        public desc :string,
        public image :string,
        public cateory: string,
        public stockavailable: boolean
    ){}
}