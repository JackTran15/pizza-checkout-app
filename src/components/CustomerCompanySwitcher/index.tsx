import { Company } from "../../common";
import { useCheckout } from "../../contexts/checkout.context";
import { Checkout } from "../../modules/checkout";
import { myLocalStorage } from "../../modules/localStorage";

export function CustomerCompanySwitcher() {
    const { checkout, setCheckout } = useCheckout()

    function setCompany(company: Company) {
        checkout.setCompany(company)
        myLocalStorage.saveCompany(company)
        setCheckout(Checkout.clone(checkout))
    }

    return <>
        <p className='sidebar__header-title'>
            Customer's Company
        </p>

        <select
            className='sidebar__header-select'
            onChange={(e) => setCompany(e.target.value as Company)}
        >
            <option value={undefined}>Unknow</option>

            {Object.values(Company)
                .map((company: Company) => {
                    return <option key={company} value={company}>
                        {company}
                    </option>
                })
            }
        </select>
    </>
}