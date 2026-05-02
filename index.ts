type Pizza = {
    id: number
    name: string
    price: number
}

type Order ={
    id: number
    pizza: Pizza
    status: "ordered" | "completed"
}

let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
    { id:nextPizzaId++, name: "Margherita", price: 8 },
    { id:nextPizzaId++, name: "Pepperoni", price: 10 },
    { id:nextPizzaId++, name: "Hawaiian", price: 10 },
    { id:nextPizzaId++, name: "Veggie", price: 9 },
]

const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Omit<Pizza, "id"> ): Pizza { //:void void type because function is not returing anything
    const newPizzaObj: Pizza = {id: nextPizzaId++, ...pizzaObj}
    menu.push(newPizzaObj)
    return newPizzaObj
}

function placeOrder(pizzaName: string):  Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

//Generics
// function addToArray<T>(array: T[], item: T): T[] {
//     array.push(item)
//     return array
// }

// addToArray<Pizza>(menu, {id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 })
// addToArray<Order>(orderQueue, { id: nextOrderId++, pizza: menu[2], status: "completed" })

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    if(!order){
        console.error(`${order} was not found`)
        return
    }
    order.status = "completed"
    return order
}

function getPizzaDetail (identifier: string | number): Pizza | undefined{
    if(typeof identifier === "string"){
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier)
    } else{
        throw new TypeError("Parameter `identifier` must be either string or number")
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)