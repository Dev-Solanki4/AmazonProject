import { formatCurrency } from "../scripts/utils/money.js";

 // describe() is an inbuilt function of jasmine which is used to provide test suite.
 // It takes 2 parameters 1) will provide name to the suite and other is function which will contain all the tests

 describe('test suite : formatCurrency',()=>{
    it('converts cents to dollar',()=>{                           // it() is used to provide a test case it takes the test name and a function which performs the tests
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    })
    it('works with rounding the nearest cents properly',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
 });