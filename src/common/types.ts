export enum Company {
    AMAZON = 'Amazon',
    FACEBOOK = 'Facebook',
    MICROSOFT = 'Microsoft',
}

export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
}

export type CheckoutProduct = Product & { quantities: number }

export type ListProductsInCart = Array<CheckoutProduct>;


export type SpecialRule = {
    id: string,
    name: string,
    company: Company,
    productId: string,
    minimumDiscountQuantities: number,
    discountPercentage: number,
}
