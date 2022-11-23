import { SpecialRule } from "../../common"

interface IPromotionCard {
    specialRule: SpecialRule
}

export function PromotionCard({ specialRule }: IPromotionCard) {
    return <div className='sidebar__footer-promotion'>
        <p className='sidebar__footer-promotion-label'>Hot deal</p>
        <p className='sidebar__footer-promotion-content'>
           {specialRule.name}
        </p>
    </div>
}