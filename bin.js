#!/usr/bin/env node

const program = require('commander')

const { wordDefinition } = require("./index")

program
    .command('word <word>')
    .alias('w <word>')
    .description("fetch")
    .action(word => wordDefinition(word))
    
program.parse(process.argv)

