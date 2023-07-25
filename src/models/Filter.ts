export enum SortProperty{
    RATING_DESC="rating",
    RATING_ASC="-rating",
    TITLE_DESC="title",
    TITLE_ASC="-title",
    PRICE_DESC="price",
    PRICE_ASC="-price",
}
export type ISort = {
    name: string,
    sortProperty: SortProperty,
}
export type IFilterInitialState = {
    searchValue:string,
    categoryId: number,
    currentPage: number,
    sort:ISort   
}
export type ISortValueProp={
    sortValue:ISort
}