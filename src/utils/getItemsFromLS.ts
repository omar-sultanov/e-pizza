import { ICartItem } from "@models/CartItem"
import { calcTotalPrice } from "./calcTotalPrice"

export const getItemsFromFS = ()=>{
    const data = localStorage.getItem('cart')
    const items = data? JSON.parse(data):[]
    const totalPrice = calcTotalPrice(items)
    return {
        items:items as ICartItem[], 
        totalPrice
    }
}