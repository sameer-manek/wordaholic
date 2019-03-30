const Dictionary = require("oxford-dictionary");
  
const config = {
    app_id : "7f2b66ee",
    app_key : "9cabb81443299fff4bdd52d0242e5b8a",
    source_lang : "en"
};

const dict = new Dictionary(config)

// word definition

async function wordDefinition(word) {
    let lookup = dict.definitions(word.toLowerCase())

    lookup.then(res => {
        let results = res.results
        console.log("following are the definitions:")
        results.map(result => {
            let definitions = result.lexicalEntries[0].entries[0].senses[0].definitions
            definitions.map(definition => console.log(definition))
        })
    }, err => {
        console.log(err)
    })
}

// word synonyms

async function wordSynonymns(word) {
    let lookup = dict.synonyms(word.toLowerCase())

    lookup.then(res => {
        let results = res.results
        console.log("following are the synonyms:")
        results.map(result => {
            let synonyms = result.lexicalEntries[0].entries[0].senses[0].synonyms
            synonyms.map(synonym => console.log(synonym.text))
        })
    }, err => {
        console.log(err)
    })
}

// word antonyms

async function wordAntonyms(word) {
    let lookup = dict.antonyms(word.toLowerCase())

    lookup.then(res => {
        let results = res.results
        console.log("following are the antonyms:")
        results.map(result => {
            let antonyms = result.lexicalEntries[0].entries[0].senses[0].antonyms
            antonyms.map(antonym => console.log(antonym.text))
        })
    }, err => {
        console.log(err)
    })
}

// word examples

async function wordExamples(word) {
    let lookup = dict.sentences(word.toLowerCase())

    lookup.then(res => {
        let results = res.results
        console.log("following are a few examples:")
        results.map(result => {
            let sentences = result.lexicalEntries[0].sentences
            try {
                for (let i = 0; i < 3; i += 1) {
                    console.log(sentences[i].text)
                }
            } catch (e) {}
        })
    }, err => {
        console.log(err)
    })
}

// word all details, definitions, synonyms, antonyms, examples
async function wordAllDetails(word) {
    await wordDefinition(word)
    await wordExamples(word)
    await wordSynonymns(word)
    await wordAntonyms(word)
}

// word of the day with all details

// word game

module.exports = { 
    wordDefinition,
    wordSynonymns,
    wordAntonyms,
    wordExamples,
    wordAllDetails
}