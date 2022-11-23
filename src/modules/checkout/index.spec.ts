import { Checkout } from '../../common';
import { ListSeedProducts, ListSpecialRules } from '../../common/seeds';
import { CheckoutProduct, Company, Product, SpecialRule } from '../types';



describe('Checkout Module unit testing', () => {
    let checkoutProducts: CheckoutProduct[];
    let newProduct: Product;

    beforeEach(() => {
        checkoutProducts = [
            {
                id: '1',
                price: 1,
                name: 'Test 1',
                quantities: 2,
                description: 'Testing product'
            },
            {
                id: '2',
                price: 2,
                name: 'Test 2',
                quantities: 2,
                description: 'Testing product 2'
            }
        ]

        newProduct = {
            id: '3',
            price: 3,
            name: 'New test item',
            description: 'Testing product 3'
        }
    })

    describe('Checkout Module - General', () => {
        let checkout = new Checkout();

        beforeEach(() => {
            const initialData = { checkoutProducts, company: null, specialRule: [] }
            checkout = new Checkout(initialData)
        })

        test('Should be defined', (done) => {
            //Act & Assert
            expect(Checkout).toBeDefined();
            expect(checkout.add).toBeDefined();
            expect(checkout.increase).toBeDefined();
            expect(checkout.decrease).toBeDefined();
            expect(checkout.remove).toBeDefined();
            expect(checkout.checkoutProducts).toBeDefined();
            expect(checkout.total).toBeDefined();
            done();
        });

        test('Constructor can initialize cart items', (done) => {
            //Act & Assert

            expect(checkout.checkoutProducts).toEqual(checkoutProducts);
            done()
        })
    });

    describe('Checkout Module - Validation', () => {
        let checkout = new Checkout();

        beforeEach(() => {
            const initialData = { checkoutProducts, company: null, specialRule: [] }
            checkout = new Checkout(initialData)
        })

        test('Calling add method should throw error when the input is invalid', (done) => {
            const wrongTypeInput: any = { ...newProduct, price: "wrong type" };
            const wrongValueInput: any = { ...newProduct, price: -1111 };

            expect(() => checkout.add(wrongTypeInput)).toThrowError();
            expect(() => checkout.add(wrongValueInput)).toThrowError();
            done()
        })

        test('Calling increase method should throw error when the id is invalid', (done) => {
            const wrongInput: any = {
                id: 1,
                num: 1
            }

            expect(() => checkout.increase(wrongInput)).toThrowError();
            done()
        })

        test('Calling increase method should throw error when the quantities is invalid', (done) => {
            const wrongTypeInput: any = {
                id: '1',
                num: '1'
            }

            const wrongValueInput: any = {
                id: '1',
                num: -1
            }

            expect(() => checkout.increase(wrongTypeInput))
                .toThrowError();

            expect(() => checkout.increase(wrongValueInput))
                .toThrowError();

            done()
        })

        test('Calling increase method should throw error when product id is not existed', (done) => {
            const nonExistsIdInput = {
                id: 'Non-exits ID',
                num: 1
            }
            expect(() => checkout.increase(nonExistsIdInput))
                .toThrow(new Error('This item is no longer available'));
            done()
        })

        test('Calling decrease method should throw error when the id is invalid', (done) => {
            const wrongInput: any = {
                id: 1,
                num: 1
            }

            expect(() => checkout.decrease(wrongInput)).toThrowError();
            done()
        })

        test('Calling decrease method should throw error when the quantities is invalid', (done) => {
            const wrongTypeInput: any = {
                id: '1',
                num: '1'
            }

            const wrongValueInput: any = {
                id: '1',
                num: -1
            }

            expect(() => checkout.decrease(wrongTypeInput)).toThrowError();
            expect(() => checkout.decrease(wrongValueInput)).toThrowError();
            done()
        })

        test('Calling decrease method should throw error when product id is not existed', (done) => {
            const nonExistsIdInput = {
                id: 'Non-exits ID',
                num: 1
            }
            expect(() => checkout.decrease(nonExistsIdInput))
                .toThrow(new Error('This item is no longer available'));
            done()
        })

        test('Calling remove method should throw error when the id is invalid', (done) => {
            const input: any = {
                id: 1,
            }

            expect(async () => checkout.decrease(input)).rejects;
            done()
        })

        test('Calling remove method should throw error when product id is not existed', (done) => {
            const nonExistsIdInput = {
                id: 'Non-exits ID',
                num: 1
            }
            expect(() => checkout.remove(nonExistsIdInput))
                .toThrow(new Error('This item is no longer available'));
            done()
        })

        test('Calling total method should throw error when the company is invalid', (done) => {
            const input: any = {
                specialRules: [],
                company: "invalid company"
            }

            expect(() => checkout.decrease(input)).toThrowError();
            done()
        })

    });

    describe('Checkout Module - Quantities Control', () => {
        let checkout = new Checkout();

        beforeEach(() => {
            const initialData = { checkoutProducts, company: null, specialRule: [] }
            checkout = new Checkout(initialData)
        })

        test('Will increase quantities for existing product instead of create new cart item', (done) => {
            checkout.add(checkoutProducts[0])
            expect(checkout.checkoutProducts[0].quantities).toEqual(3);
            done()
        })

        test('Can increase num of quantities for 1 cart item in the same time', (done) => {
            checkout.increase({ id: checkoutProducts[0].id, num: 1 });
            expect(checkout.checkoutProducts[0].quantities).toEqual(3);

            checkout.increase({ id: checkoutProducts[1].id, num: 2 });
            expect(checkout.checkoutProducts[1].quantities).toEqual(4);
            done()
        })

        test('Will create new cart item with when new product appended', (done) => {
            checkout.add(newProduct)
            expect(checkout.checkoutProducts.length).toEqual(3);
            expect(checkout.checkoutProducts[2].name).toEqual(newProduct.name);
            expect(checkout.checkoutProducts[2].id).toEqual(newProduct.id);
            expect(checkout.checkoutProducts[2].price).toEqual(newProduct.price);
            expect(checkout.checkoutProducts[2].quantities).toEqual(1);
            done()
        })

        test('Will decrease num of product quantities', (done) => {
            checkout.decrease({ id: checkoutProducts[1].id, num: 1 })
            expect(checkout.checkoutProducts[1].quantities).toEqual(1)

            checkout.decrease({ id: checkoutProducts[0].id, num: 2 })
            expect(checkout.checkoutProducts[0].quantities).toEqual(0)
            done()
        })

        test('Will decrease num of product quantities to 0 when num parameter greater than quantities', (done) => {
            checkout.decrease({ id: checkoutProducts[1].id, num: checkoutProducts[1].quantities + 1 })
            expect(checkout.checkoutProducts[1].quantities).toEqual(0)
            done()
        })

        test('Can remove a cart item by its Id', (done) => {
            checkout.remove({ id: checkoutProducts[0].id })
            expect(checkout.checkoutProducts.length).toEqual(1)
            expect(checkout.checkoutProducts.find(item => item.id === checkoutProducts[0].id)).toBeFalsy()
            done()
        })

        test('Will remove a cart item when decrease quantites with current quantities is 1', (done) => {
            checkout.checkoutProducts[1].quantities = 1;
            checkout.decrease({ id: checkoutProducts[1].id, num: 1 })
            expect(checkout.checkoutProducts.length).toEqual(1)
            expect(checkout.checkoutProducts.find(item => item.id === checkoutProducts[1].id)).toBeFalsy()
            done()
        })
    })

    describe('Checkout Module - Pricing calculation', () => {
        let checkout = new Checkout();

        beforeEach(() => {
            const initialData = { checkoutProducts: [], company: null, specialRule: [] }
            checkout = new Checkout(initialData)
        })

        test('Normal pricing calculation', (done) => {
            checkout.add(ListSeedProducts[0])
            checkout.add(ListSeedProducts[1])
            checkout.add(ListSeedProducts[2])

            checkout.setCompany(null);
            checkout.setSpecialRules([]);

            const expectTotal = ListSeedProducts.reduce((total: number, product: Product) => product.price + total, 0)
            expect(checkout.total()).toEqual(expectTotal);
            done()
        })

        test('Amazon staff can buy cheaper Large Pizza with right discount percentage', (done) => {
            const largePizza = ListSeedProducts[2];
            const AmazonSpecialPricerule: SpecialRule = {
                productId: largePizza.id,
                name: 'Amazon deal',
                company: Company.AMAZON,
                minimumDiscountQuantities: 1,
                discountPercentage: 20,
                id: 'sampleID'
            }

            checkout.add(largePizza)

            checkout.setCompany(Company.AMAZON);
            checkout.setSpecialRules([AmazonSpecialPricerule]);

            const total = checkout.total()

            expect(total).toBeLessThan(largePizza.price)
            expect(total.toFixed(2)).toEqual((largePizza.price * (100 - AmazonSpecialPricerule.discountPercentage) / 100).toFixed(2))
            done()
        })

        test('Should apply the highest discount percentage deal for each product type', (done) => {
            const largePizza = ListSeedProducts[2];
            const amazonSpecialPricerule: SpecialRule = {
                productId: largePizza.id,
                name: 'Amazon deal 20',
                company: Company.AMAZON,
                minimumDiscountQuantities: 1,
                discountPercentage: 20,
                id: 'sampleID'
            }

            const betterAmazonSpecialPricerule: SpecialRule = {
                productId: largePizza.id,
                name: 'Amazon deal 25',
                company: Company.AMAZON,
                minimumDiscountQuantities: 1,
                discountPercentage: 25,
                id: 'sampleID'
            }

            checkout.add(largePizza)

            checkout.setCompany(Company.AMAZON);
            checkout.setSpecialRules([amazonSpecialPricerule, betterAmazonSpecialPricerule]);

            const total = checkout.total()

            expect(total).toBeLessThan(largePizza.price)
            expect(total.toFixed(2)).toEqual((largePizza.price * (100 - betterAmazonSpecialPricerule.discountPercentage) / 100).toFixed(2))
            done()
        })

        test('Microsoft - Gets a 3 for 2 deal for Small Pizzas', (done) => {
            const smallPizza = ListSeedProducts[0];
            const specialRule: SpecialRule = ListSpecialRules[0];

            checkout.add(smallPizza)
            checkout.add(smallPizza)
            checkout.add(smallPizza)

            checkout.setCompany(Company.MICROSOFT);
            checkout.setSpecialRules([specialRule]);

            const total = checkout.total()

            expect(total).toBeLessThan(smallPizza.price * 3)
            expect(total.toFixed(2)).toEqual((smallPizza.price * 2).toFixed(2))
            done()
        })

        test('Facebook - Gets a 5 for 4 deal on Medium Pizza', (done) => {
            const mediumPizza = ListSeedProducts[1];
            const specialRule: SpecialRule = ListSpecialRules[2];

            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)

            checkout.setCompany(Company.FACEBOOK);
            checkout.setSpecialRules([specialRule]);

            const total = checkout.total()

            expect(total).toBeLessThan(mediumPizza.price * 5)
            expect(total.toFixed(2)).toEqual((mediumPizza.price * 4).toFixed(2))
            done()
        })

        test("Facebook - Should not apply special rule when Checkout Item's quantities do not reach the rule's minimum discount quantities", (done) => {
            const mediumPizza = ListSeedProducts[1];
            const specialRule: SpecialRule = ListSpecialRules[2];

            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)

            checkout.setCompany(Company.FACEBOOK);
            checkout.setSpecialRules([specialRule]);

            const total = checkout.total()

            expect(total).toBeGreaterThan(mediumPizza.price * 3 * specialRule.discountPercentage / 100)
            expect(total.toFixed(2)).toEqual((mediumPizza.price * 3).toFixed(2))
            done()
        })

        test('Facebook - Gets a 5 for 4 deal on Medium Pizza | buy 7 pizzas', (done) => {
            const mediumPizza = ListSeedProducts[1];
            const specialRule: SpecialRule = ListSpecialRules[2];

            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)
            checkout.add(mediumPizza)

            checkout.setCompany(Company.FACEBOOK);
            checkout.setSpecialRules([specialRule]);

            const total = checkout.total()

            expect(total).toBeLessThan(mediumPizza.price * 7)
            expect(total.toFixed(2)).toEqual((mediumPizza.price * 4 + mediumPizza.price * 2).toFixed(2))
            done()
        })
    })
})

