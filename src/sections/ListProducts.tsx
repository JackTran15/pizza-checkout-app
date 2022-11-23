import { Product } from "../common";
import { ProductCard } from "../components"

interface IListProductsProps {
    products: Product[]
}

export function ListProducts({ products }: IListProductsProps) {
    return <>
        <div className='wrap__listProduct'>
            <div className='listProduct'>
                {products.map(e => <ProductCard key={e.id} product={e} />)}
            </div>
        </div>
    </>
}