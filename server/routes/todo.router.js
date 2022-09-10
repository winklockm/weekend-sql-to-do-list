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

// POST
todoRouter.post('/', (req, res) => {
    let newItem =  req.body;
    console.log('Adding new item', newItem);
    let queryText = `
        INSERT INTO list (complete, task)
            VALUES ($1, $2);
    `;
    pool.query(queryText, [newItem.complete, newItem.task])
        .then((postResponse) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error adding new item:', error);
            res.sendStatus(500);
        });
})

// DELETE
todoRouter.delete('/:idToDelete', (req,res)=>{
    console.log(req.params);
    let listID = req.params.idToDelete;
    console.log(listID);
    const sqlQuery = `
        DELETE FROM list
            WHERE id = $1;
    `
    const sqlValues = [listID];
    pool.query(sqlQuery, sqlValues)
        .then((poolRes)=>{
            res.sendStatus(200);
        })
        .catch((poolErr)=>{
            console.log('Error deleting item', poolErr);
            res.sendStatus(500); // Good server always responds
        })
})

//PUT
todoRouter.put('/:idToUpdate', (req,res) => {
    console.log(req.params);
    let idToUpdate = req.params.idToUpdate;

    let sqlQuery = `UPDATE list
                        SET complete = NOT complete
                        WHERE id = $1;`

    let sqlValues = [idToUpdate];

    pool.query(sqlQuery,sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
        res.sendStatus('error is',dbErr);
        })
    })

// export
module.exports = todoRouter;