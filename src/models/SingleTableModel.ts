/// <reference path="../../typings/index.d.ts" />

"use strict";

import * as express from 'express';
import * as Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

//set up table and primary index field names

var projectdir = path.join(__dirname,'../../');

//get configuration info
var cfg=JSON.parse(fs.readFileSync(path.join(projectdir,'SingleTableRestfulApi.cfg'),{encoding:'utf8'}));
var tableName=cfg.tableName;
var keyFieldName=cfg.keyFieldName;

//set up query builder and database connection pool
var knex=Knex({client: 'mysql', connection: cfg})

export function getSingleTableList(req:express.Request, res:express.Response){
    knex
        .select()
        .from(tableName)
        .then(data => {res.status(200).json(data); })
        .catch(err =>{res.status(401).send(err)})
    ;
}

export function getSingleTableId(req:express.Request, res:express.Response){
    knex
        .select()
        .from(tableName)
        .where(keyFieldName, req.params['id'])
            .then(data => {res.status(200).json(data);})
            .catch(err => {res.status(401).send(err)})
        ;
}

export function getSingleTableRange(req:express.Request, res:express.Response){
    knex
        .select()
        .from(tableName)
        .offset(parseInt(req.params['offset']))
        .limit(parseInt(req.params['limit']))
        .then(data => {res.status(200).json(data);})
        .catch(err => {res.status(401).send(err)})
        ;

}

export function addSingleTableEntry(req:express.Request, res:express.Response){
    knex
        .into(tableName)
        .insert(req.body)
        .then(data => {res.status(200).json(data);})
        .catch(err => {res.status(401).send(err)})
    ;
}

export function updateSingleTableEntry(req:express.Request, res:express.Response) {
    knex
        .update(req.body)
        .from(tableName)
        .where(keyFieldName, req.params['id'])
        .then(data => {res.status(200).json(data);})
        .catch(err => {res.status(401).send(err)})
    ;
}

export function deleteSingleTableEntry(req:express.Request, res:express.Response){
    knex
        .delete()
        .from(tableName)
        .where(keyFieldName, req.params['id'])
        .then(data => {res.status(200).json(data);})
        .catch(err => {res.status(401).send(err)})
    ;
}