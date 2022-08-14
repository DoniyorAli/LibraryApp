const express = require('express')

const router = express.Router()

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
    ],
    books:[
        {
            id: 101,
            isbn: "978-0393058000",
            title: "Temur tuzuklari",
            gener: "real events",
            description: "Amir Temur's just rule, state administration, politics and his military campaigns",
            author: "Shamsuddin Somiy",
            publish_year: 1730,
            cover_photo_url: "https://images-na.ssl-images-amazon.com/images/I/91hJe52QzjL.jpg",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        },
        {
            id: 102,
            isbn: "978-0393058001",
            title: "Sherlock Holmes",
            gener: "fictional detective",
            description: "Sherlock Holmes is a fictional detective created by British author Sir Arthur Conan Doyle. Referring to himself as a in the stories, Holmes is known for his proficiency with observation, deduction, forensic science and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
            author: "Arthur Conan Doyle",
            publish_year: 2006,
            cover_photo_url: "https://images-na.ssl-images-amazon.com/images/I/91hJe52QzjL.jpg",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        }
    ],
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
            booked_day: "2022-05-23",
            returned_day: "2022-06-25",
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

    let regCustomer = DataBase.rental_info.find(r => r.customer_id == customer_id)  // id => customer_id
    if(!regCustomer){
        let newEl = {
            customer_id: customer_id,
            book_id: book_id,
            booked_day:new Date (),
            created_at: new Date(),
            returned_day: null
        }
        DataBase.rental_info.push(newEl)
        res.status(201).send("Successfully created")
        return
    }
    let found = DataBase.rental_info.find(r => r.customer_id == customer_id && r.returned_day == null)
    if(!found){
        let newEl = {
            customer_id: customer_id,
            book_id: book_id,
            booked_day:new Date (),
            created_at: new Date(),
            returned_day: null
        }
        DataBase.rental_info.push(newEl)
        res.status(201).send("Successfully created")
        return
    }
    res.status(400).send("This customer took book and didn't return!")
    return 

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
    foundCus.updated_at = new Date()
    foundCus.returned_day = new Date()
    res.status(200).send("Successfully updated")
})

module.exports = router