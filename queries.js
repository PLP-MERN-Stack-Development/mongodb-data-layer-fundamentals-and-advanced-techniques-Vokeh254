use plp_bookstore
db.createCollection('books')

//A. Insert Books
db.books.insertMany([
   {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
])


//B. Queries

// Find all books in a specific genre
db.books.find({genre: 'Gothic Fiction'})



// Find books published after a certain year
db.books.find({published_year: {$gt: 1900}})

// Find books by a specific author
db.books.find({author: 'Paulo Coelho'})

// Update the price of a specific book                            
db.books.updateOne({title: 'The Alchemist'},
                   {$set: {price: 11.99}})

// Delete a book by its title
db.books.deleteOne({title: 'Animal Farm'})


//Task 3: Advanced Queries
//A. Find books in stock and published after 2010
db.books.find({in_stock: true, published_year: {$gt: 2010}})

//B. Retrieve only the title, author, and price of all books
db.books.find({}, {title: 1, author: 1, price: 1, _id:0})

//C. Sort books by price in ascending order
db.books.find().sort({price: 1})

//D. Pagination (5 per page)
db.books.find().limit(5).skip(0)
db.books.find().limit(5).skip(5)


//Task 4: Aggregation Pipeline

//A. Average price by genre
db.books.aggregate([
  {$group: {_id: "$genre", avgPrice: {$avg: "$price"}}}
])

//B. Total books and average pages by author
db.books.aggregate([
  {$group: {_id: "$author", bookCount: {$sum: 1}}},
            {$sort: {bookCount: -1}},
            {$limit: 1}
])

//C. Books published per decade
db.books.aggregate([
  {
    $group:{
      _id: {$concat:[ {$toString: {$multiply: [ {$floor: {$divide: ["$published_year", 10]}}, 10] } }, "s"]},
      count: {$sum:1}
   }
  }
])

//Task 5: Indexing and Performance
//A. Create indexes
db.books.createIndex({title:1})

//B. Compound index on author and published_year
db.books.createIndex({author: 1, published_year:  -1})

//C. Explain query performance
db.books.find({title: "The Hobbit"}).explain("executionStats")

db.books.find({author: "The Alchemist", published_year: {$gt: 1900}}).explain("executionStats")
