const express = require('express')

const router = express.Router()

//==============================BOOKS_C-R-U-D====================================
let DataBase = {
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
        },
        {
            id: 103,
            isbn: "978-9943-20-411-9",
            title: "Hamsa",
            gener: "epic",
            description: "One of Alisher Navoi's greatest works is Hasma's epic Layvi and Majnun, Tahir and Zuhra, Sabbai Sayyor, Saddiy Iskandari, a collection of his works.",
            author: "Alisher Navoiy",
            publish_year: 1483,
            cover_photo_url: "https://images-na.ssl-images-amazon.com/images/I/91hJe52QzjL.jpg",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        }
    ]
}
//===============================================================================
// CREATED
router.post('/', (req, res) => {
    let book = req.body

    if (!book.isbn) {
        res.status(400).send("Enter the isbn of the book!")
        return
    }

    if (!book.title) {
        res.status(400).send("Enter the title of the book!")
        return
    }

    if (!book.gener) {
        res.status(400).send("Enter the gener of the book!")
        return
    }

    if (!book.description) {
        res.status(400).send("Enter the  description of the book!")
        return
    }

    if (!book.publish_year) {
        res.status(400).send("Enter the publish_year of the book!")
        return
    }

    if (!book.cover_photo_url) {
        res.status(400).send("Enter the cover_photo_url of the book!")
        return
    }
    
    for (i = 0; i < DataBase.books.length; i++) {
        let element = DataBase.books[i]

        if (book.id == element.id) {
            res.status(400).send("This ID already exicst");
            return
        }
    }
    book.created_at = new Date()
    DataBase.books.push(book)
    res.status(201).send("Successfully created")
})
//=============================================================================

// READ
router.get('/', (req, res) => {
    let search = req.query.search

    if (!search) {
        search = ""
    }

    // Bookni titlesi orqali aniqlaymiz filter bilan
    let list = DataBase.books.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("Book not found")
        return
    }
    res.json(list)
})

router.get('/:id', (req, res) => {   // URLda kiritilgan ID Malumotlar omborida bor yoki yoqligi
    const elementBody = req.params.id
    const book = DataBase.books.find(element => element.id == elementBody)

    if (!book) {
        res.status(401).send("This ID not found")
        return
    }
    res.status(200).json(book)
})
//============================================================================

// UPDATE
router.put('/', (req,res) => {
    let body = req.body
    let book = DataBase.books.find(element => element.id == body.id)

    if (!book) {
        res.status(400).send("This ID is not found");
        return
    }

    for (let i = 0; i < DataBase.books.length; i++) {
        const element = DataBase.books[i];
        if (element.id == body.id) {
            body.createAt = DataBase.books[i].createAt
            body.updatedAt = new Date()
            DataBase.books[i] = body
            break;
        }
    }
    res.status(200).send("Book was updated")
})
//=================================================================================

// DELETE
router.delete('/:id', (req, res) => {
    let elementID = req.params.id
    let book = DataBase.books.find(element => element.id == elementID)

    if (!book) {
        res.status(400).send("this id of the book is not found")
        return
    }

    DataBase.books = DataBase.books.filter(element => element.id != elementID)

    res.status(200).send("Book was deleted")
})

module.exports = router