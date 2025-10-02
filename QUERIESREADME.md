# MongoDB Queries Script (`queries.js`)

This file contains MongoDB shell commands for creating a bookstore database, inserting sample book documents, and performing various queries, updates, aggregations, and indexing operations.

## Contents

- Create and populate the `plp_bookstore` database and `books` collection
- Find books by genre, year, author, and other criteria
- Update and delete book documents
- Advanced queries: filtering, projection, sorting, pagination
- Aggregation pipelines: average price by genre, author with most books, grouping by decade
- Index creation and performance analysis with `explain()`

## How to Run the Script

### Prerequisites

- **MongoDB** installed and running locally
- **MongoDB Shell (`mongosh`)** installed

### Steps

1. **Start your MongoDB server**  
   Make sure MongoDB is running on your machine.  
   Example (default port):  
   ```bash
   mongod
   ```

2. **Open a terminal and navigate to the assignment directory**  
   Example:  
   ```bash
   cd path/to/mongodb-data-layer-fundamentals-and-advanced-techniques-Vokeh254
   ```

3. **Run the queries script using MongoDB Shell**  
   ```bash
   mongosh --file queries.js
   ```

   This will execute all commands in [`queries.js`](mongodb-data-layer-fundamentals-and-advanced-techniques-Vokeh254/queries.js) sequentially.

### Notes

- The script will create the `plp_bookstore` database and the `books` collection if they do not exist.
- It will insert sample book data and perform various queries and operations.
- You can modify or comment out sections in [`queries.js`](mongodb-data-layer-fundamentals-and-advanced-techniques-Vokeh254/queries.js) to run specific queries as needed.

## Reference

- [MongoDB Shell Documentation](https://www.mongodb.com/docs/mongodb-shell/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
