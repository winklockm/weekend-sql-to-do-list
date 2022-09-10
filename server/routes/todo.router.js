const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// add code

// get request
todoRouter.get('/', (req, res) => {
    // get table data
    const sqlQuery = `
      SELECT * FROM list
        ORDER BY "id" DESC;
    `
pool.query(sqlQuery)
    .then((dbRes) => {
    let listItems = dbRes.rows;
    res.send(listItems);
})
    .catch((dbErr) => {
    console.log('db query in GET /list failed:', dbErr);
    res.sendStatus(500);
    })
})

// export
module.exports = todoRouter;