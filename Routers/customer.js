const express = require('express')

const router = express.Router()

//============================CUSTOMERS_C-R-U-D=================================
let DataBase = {
    customers:[
        {
            id: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phone: "+998987654321",
            date_of_birth: "20-04-1998",
            address: "221B Baker Street, London",
            created_at: "2022-03-26T09:08:22.000000Z",
            updated_at: "2022-05-26T09:08:27.000000Z"
        },
        {
            id: 2,
            firstname: "Jack",
            lastname: "Doe",
            email: "jack.doe@example.com",
            phone: "+998987654321",
            date_of_birth: "12-06-1997",
            address: "221B Baker Street, London",  
            created_at: "2022-04-26T09:08:12.000000Z",
            updated_at: "2022-05-26T09:08:18.000000Z"
        },
        {
            id: 3,
            firstname: "Alex",
            lastname: "Bon",
            email: "alex.bon@example.com",
            phone: "+998987654565",
            date_of_birth: "25-08-1999",
            address: "123B Daker Street, London",  
            created_at: "2022-02-26T09:09:32.000000Z",
            updated_at: "2022-03-26T09:11:52.000000Z"
        }
    ]
}
//=========================================================================
// CREATED
router.post('/', (req, res) => {
    let customer = req.body
console.log(!customer.firstname)
    if (!customer.firstname) {
        res.status(400).send("Enter your firstname!")
        return
    }

    if (!customer.lastname) {
        res.status(400).send("Enter your lastname!")
        return
    }

    if (!customer.email) {
        res.status(400).send("Enter your email!")
        return
    }

    if (!customer.phone) {
        res.status(400).send("Enter your phone!")
        return
    }

    if (!customer.date_of_birth) {
        res.status(400).send("Enter your phone!")
        return
    }

    if (!customer.address) {
        res.status(400).send("Enter your phone!")
        return
    }
 console.log(DataBase.customers[0])
    for (i = 0; i < DataBase.customers.length; i++) {
//    console.log("=====>>>>>>")
        let element = DataBase.customers[i]

        if (customer.id == element.id) {
            res.status(400).send("This ID already exicst");
            return
        }
    }
    customer.created_at = new Date()
    DataBase.customers.push(customer)
    res.status(201).send("Successfully created")
})
//===========================================================================

// READ
router.get('/', (req, res) => {
    let search = req.query.search

    if (!search) {
        search = ""
    }

    // Customerni ismi orqali aniqlaymiz filter bilan
    let list = DataBase.customers.filter(e => e.firstname.toLowerCase().includes(search.toLowerCase()))
    // let list2 = DataBase.customers.filter(e => e.lastname.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("Customers not found")
        return
    }
    res.json(list)
})

router.get('/:id', (req, res) => {   // URLda kiritilgan ID Malumotlar omborida bor yoki yoqligi
    const elementID = req.params.id
    const customer = DataBase.customers.find(element => element.id == elementID )
    if (!customer) {
        res.status(401).send("This customer is not found")
        return
    }

    res.status(200).json(customer)
})
//==============================================================================

// UPDATE
router.put('/:id', (req,res) => {
    let id = req.params.id
    let body = req.body
    let customer = DataBase.customers.find(element => element.id == id)

    if (!customer) {
        res.status(400).send("This customer is not found");
        return
    }

    for (let i = 0; i < DataBase.customers.length; i++) {
        const element = DataBase.customers[i];
//        console.log("=====>>>>>>")
        if (element.id == id) {
            body.createAt = DataBase.customers[i].createAt
            body.updatedAt = new Date()
            DataBase.customers[i] = body
            break;
        }
    }
    res.status(200).send("Customer was updated")
})
//==================================================================================

// DELETE
router.delete('/:id', (req,res) => {
    let id = req.params.id
    let customer = DataBase.customers.find(element => element.id == id)

    if (!customer) {
        res.status(400).send("This customer is not found");
        return
    }
    DataBase.customers = DataBase.customers.filter(element => element.id != id)

    res.status(200).send("Customer was deleted")
})

module.exports = router
