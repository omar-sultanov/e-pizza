export interface IPizza{
    id:string,
    imageUrl:string,
    title:string,
    types:number[],
    sizes:number[],
    price:number,
    category:number,
    rating:number,
    name:string,
}

export interface IPizzaInitialState {
    items: IPizza[],
    status: 'loading'|'success'|'error',
}

export interface ISearchParams{
    category:string, 
    order:string, 
    sortBy:string, 
    currentPage:string
}