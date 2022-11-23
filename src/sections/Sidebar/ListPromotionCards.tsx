import { SpecialRule } from "../../common";
import { useCheckout } from "../../contexts/checkout.context"

export function ListApplicablePromotionCards() {
    const { checkout } = useCheckout();

    return <>
        {checkout.getAppliedRules().map((rule: SpecialRule) => {
            return <div className='sidebar__footer-promotion'>
                {/* <p className='sidebar__footer-promotion-label'>Hot deal</p> */}
                <p className='sidebar__footer-promotion-content'>
                    {rule.name}
                </p>
            </div>
        })}
    </>
}