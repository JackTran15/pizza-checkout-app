import { Company, SpecialRule } from "./types"

export type IncreaseCheckoutProductQuantitiesParams = {
    id: string,
    num: number
}

export type DecreaseCheckoutProductQuantitiesParams = {
    id: string,
    num: number
}
export type RemoveCheckoutProductQuantitiesParams = {
    id: string,
}

export type GetTotalParams = {
    specialRules: Array<SpecialRule>,
    company: Company,
}

