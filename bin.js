#!/usr/bin/env node

const program = require('commander')

const { 
    wordDefinition, 
    wordSynonymns,
    wordAntonyms,
    wordExamples,
    wordAllDetails
} = require("./index")

program
    .command('lookup <word>')
    .alias('l')
    .description("fetch definitions for the given word")
    .action(word => wordDefinition(word))

program
    .command('synonyms <word>')
    .alias('s')
    .description("fetch synonyms of the given word")
    .action(word => wordSynonymns(word))

program
    .command('antonyms <word>')
    .alias('a')
    .description("fetch antonyms of the given word")
    .action(word => wordAntonyms(word))

program
    .command('examples <word>')
    .alias('e')
    .description("fetch examples of the given word")
    .action(word => wordExamples(word))

program
    .command('details <word>')
    .alias('d')
    .description("fetch all the details about word")
    .action(word => wordAllDetails(word))
    
program.parse(process.argv)

