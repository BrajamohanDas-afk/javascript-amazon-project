import { formatCurrency } from "../scripts/utils/money.js";

//describe() creates a test suite 
describe('test suite: formatCurrency', ()=>{
    //it() creates a test 
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    })
})                                                      