const express = require('express')

const router = express.Router()

let DataBase = {
    rental_info:[
        {
            customer_id: 1,
            book_id: 101,
            booked_day: "2022-05-22",
            returned_day: "2022-09-26",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        },
        {
            customer_id: 2,
            book_id: 102,
            booked_day: "2022-05-23",
            returned_day: "2022-09-27",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        },
        {
            customer_id: 3,
            book_id: 103,
            booked_day: "2022-05-12",
            returned_day: "2022-09-16",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        }
    ]
}

//===============================================RENTAL_INFO===========================================================
// CREATE INFO
router.get('/rental_info', (req, res) =>{
    res.json(DataBase.rental_info)
})

router.post('/rental_info/:idc/:idb/booked', (req,res) => {
    let customer_id = req.params.idc
    let book_id = req.params.idb

    let findCustomer = DataBase.customers.find(c => c.id == customer_id)
    if (!findCustomer){
        res.status(404).send("Not regestered in customer base!")
    }

    let findBook = DataBase.books.find(b => b.id == book_id)
    if (!findBook) {
        res.status(404).send("This book not found!")
    }

    if(DataBase.rental_info.length){
        let found = DataBase.rental_info.find(e => e.id == customer_id && e.returned_day == null)

        if (found){
            res.status(400).send("This customer taken book no returned!")
        }
    }

    let newEl = {
        customer_id: customer_id,
        book_id: book_id,
        created_at: new Date(),
        returned_day: null
    }
    DataBase.rental_info.push(newEl)
    res.status(201).send("Successfully created")
})
//======================================================================

// UPDATE INFO
router.put('/rental_info/:idc/:idb/returned', (req,res) => {
    let customerId = req.params.idc
    let foundCus =  DataBase.rental_info.find(e => e.customer_id == customerId && e.returned_day == null)

    if (!foundCus){
        res.status(400).send("Good all books was returned")
        return
    }

    foundCus.returned_day = new Date()
    res.status(200).send("Successfully updated")
})

module.exports = router