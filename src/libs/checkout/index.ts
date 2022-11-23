import {
    IncreaseCheckoutProductQuantitiesParams,
    DecreaseCheckoutProductQuantitiesParams,
    RemoveCheckoutProductQuantitiesParams,
} from './dto';
import { CheckoutProduct, SpecialRule, Company, Product } from '../../common';

interface CheckoutInitializeDTO {
    checkoutProducts: CheckoutProduct[],
    specialRules: SpecialRule[],
    company: Company | null,
}

export class Checkout {
    checkoutProducts: CheckoutProduct[]
    specialRules: SpecialRule[]
    company: Company | null

    constructor(initialData: Partial<CheckoutInitializeDTO> | void) {
        const {
            checkoutProducts = [],
            specialRules = [],
            company = null
        } = initialData || {}

        if (company) Object.values(Company).includes(company)

        this.checkoutProducts = checkoutProducts
        this.specialRules = specialRules
        this.company = company
    };

    /**
     * Clone new instance from existed one
     * @param instance Checkout Instance
     * @returns 
     */
    static clone(instance: Checkout): Checkout {
        return new Checkout({
            checkoutProducts: instance.checkoutProducts,
            specialRules: instance.specialRules,
            company: instance.company,
        })
    }

    setSpecialRules(specialRules: SpecialRule[]) {
        this.specialRules = specialRules
    }

    setCompany(company: Company | null = null) {
        this.company = company
    }

    /**
     * Add 1 product to cart
     * @param product  Product
     * @return void
     */
    add(product: Product): any {
        // check is this product id has been exists already in cart products list
        const itemIndex = this.checkoutProducts.findIndex((CheckoutProduct) => CheckoutProduct.id === product.id);

        // whether it's not exists => append new CheckoutProduct
        if (itemIndex === -1) {
            const CheckoutProduct: CheckoutProduct = {
                ...product,
                quantities: 1,
            }

            this.checkoutProducts.push(CheckoutProduct);
            return;
        }

        // if the product has been exists =>  increase the quantities of that product's cart Item
        this.increase({ id: product.id, num: 1 });
        return;

    }

    /**
     * Increase quantities of 1 CheckoutProduct by its id
     * @param input        IncreaseCheckoutProductQuantitiesParams
     * @return void
     */
    increase(input: IncreaseCheckoutProductQuantitiesParams) {
        const { id, num } = input;

        const itemIndex = this.checkoutProducts.findIndex((CheckoutProduct) => CheckoutProduct.id === id);
        if (itemIndex === -1) throw new Error('This item is no longer available');
        this.checkoutProducts[itemIndex].quantities += num;
        return;
    }

    /**
     * decrease quantities of 1 CheckoutProduct by its id
     * @param input      DecreaseCheckoutProductQuantitiesParams
     * @return void
     */
    decrease(
        input: DecreaseCheckoutProductQuantitiesParams,
    ) {
        const { id, num } = input;

        const itemIndex = this.checkoutProducts.findIndex((CheckoutProduct) => CheckoutProduct.id === id);

        if (itemIndex === -1)
            throw new Error('This item is no longer available');

        // remove cart item completely if its quantites just have 1 left
        if (this.checkoutProducts[itemIndex].quantities === 1)
            return this.remove({ id })

        if (this.checkoutProducts[itemIndex].quantities < num)
            this.checkoutProducts[itemIndex].quantities = 0;
        else
            this.checkoutProducts[itemIndex].quantities -= num;

        return;
    }

    /**
     * Remove 1 CheckoutProduct by its id
     * @param input        RemoveCheckoutProductQuantitiesParams
     * @return void
     */
    remove(input: RemoveCheckoutProductQuantitiesParams) {
        const { id } = input;

        const itemIndex = this.checkoutProducts.findIndex((CheckoutProduct) => CheckoutProduct.id === id);
        if (itemIndex === -1) throw new Error('This item is no longer available');
        this.checkoutProducts = this.checkoutProducts.filter(item => item.id !== id);
        return;
    }

    /**
     * Get 1 best price discount for 1 product may match minimum quantities and privilledge customer conditions
     * @param checkoutProduct CheckoutProduct
     * @returns SpecialRule | null
     */
    getApplicableRule(checkoutProduct: CheckoutProduct): SpecialRule | null {
        const applicableRules = this.specialRules
            .filter(rule => {
                const matchId = rule.productId === checkoutProduct.id
                const matchCompany = !rule.company || rule.company === this.company
                const matchMinimumQuantities = rule.minimumDiscountQuantities <= checkoutProduct.quantities
                return matchId && matchCompany && matchMinimumQuantities;
            })
            .sort((ruleA, ruleB) => ruleA.discountPercentage < ruleB.discountPercentage ? 1 : -1);
        return applicableRules.length ? applicableRules[0] : null;
    }

    /**
     * Get applied Rule that will be applied to discount total price
     * @returns SpecialRule | null
     */
    getAppliedRules(): SpecialRule[] {
        return this.checkoutProducts
            .map((item: CheckoutProduct): SpecialRule | null => this.getApplicableRule(item))
            .filter((e: SpecialRule | null) => e ? true : false) as SpecialRule[];
    }

    /**
     * Each product will have several discount rules 
     * So, we're going to calculate the total price for each cart item (product - quantities pair)
     * Then sum them up
     * @return number   total money checkout
     */
    total(): number {
        return this.checkoutProducts
            .map(item => {
                // choose the best discount rule for customer
                const applicableRule = this.getApplicableRule(item);

                // if there is no applicable rule => return normal total prices calculation
                if (!applicableRule) return item.price * item.quantities;

                // counting num of product's quantities that can be discounted according to rule's config
                const discountedQuantites = item.quantities - item.quantities % applicableRule.minimumDiscountQuantities;

                // sum up the discounted price of discountable quantities
                const discountedPrice = discountedQuantites * item.price * (100 - applicableRule.discountPercentage) / 100;

                // sum up undiscounted price (normal price) of other product's quantities left
                const unDiscountedPrice = (item.quantities - discountedQuantites) * item.price;

                const price = discountedPrice + unDiscountedPrice;

                return price;
            })
            .reduce((total: number, totalPrice: number) => total + totalPrice, 0);
    }
}