import { CheckoutProduct, Company } from "../../common";

const LOCAL_STORAGE_CART = 'CART'
const LOCAL_STORAGE_COMPANY = 'COMPANY'

export const myLocalStorage = {
    saveCheckoutProducts: function (items: CheckoutProduct[]): void {
        localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(items));
    },

    getCheckoutProducts: function (): CheckoutProduct[] {
        const saveData = localStorage.getItem(LOCAL_STORAGE_CART);
        if (!saveData) return []
        return JSON.parse(saveData) as CheckoutProduct[];
    },

    saveCompany: function (company: Company): void {
        localStorage.setItem(LOCAL_STORAGE_COMPANY, company);
    },

    getCompany: function (): Company | null {
        return localStorage.getItem(LOCAL_STORAGE_COMPANY) as Company || null;
    }
}


