import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-oop.js'
// import '../data/cart-class.js'
// import '../data/car.js'
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";

async function loadPage(){
    //in try() we will put the code which can in future
    //throw an error  
    //if in try any error are not coming then it will not go to catch
    try {
        //when u put throw it will directly go the catch
        //it also help us to manually throw an error
        // throw 'error1';
    // const value = await new Promise((resolve, reject)=>{
    //     // throw 'error2';
    //     loadCart(()=>{
    //         // reject('error3')
    //         resolve('value-3');
    //     });
    // })
    await Promise.all ([
      loadProductsFetch(),
      loadCartFetch()
    ]);
    // await loadProductsFetch();
    // await loadCartFetch();
   
    }catch(error){
        console.log('unexpected error. Please try again later'); 
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage()

/*
//it let us run multiple promise all at the same time
//an in this promise we run all the thing at the same time
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })

])
.then((values)=>{
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
in this promise we do this step by step 
new Promise ((resolve)=>{
    console.log('start promise')
    loadProducts(()=>{
        console.log('finish loading');
        resolve('value1');
    });
})
//To add next step we use .then
.then((value)=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
})
.then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});


loadProducts(()=>{
    loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

    })
});
*/