export type ICartItem = {
    id:string 
    title:string 
    type:string 
    size:number 
    imageUrl:string 
    price:number 
    count:number 
}

export type ICartInitialState = {
    totalPrice: number,
    items: ICartItem[],
}