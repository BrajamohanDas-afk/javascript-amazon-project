export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){
    //unshift add orders to the front of the arry rather than the back
    orders.unshift(order)
    saveToStorage();
};

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
};