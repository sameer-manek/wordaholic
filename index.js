const axios = require('axios')

const Dictionary = require("oxford-dictionary");
  
const config = {
    app_id : "7f2b66ee",
    app_key : "9cabb81443299fff4bdd52d0242e5b8a",
    source_lang : "en"
};

const dict = new Dictionary(config)

/*
    to make code readable, I am using the oxford dictionary's npm package, the same could be achieved using following code (but will look messy):

    async function request(url) {
        return await axios.get({
            url,
            headers: {
                app_id: config.app_id,
                app_key: config.app_key
            }
        }).then(({ result }) => (result)).catch(err => console.log(err))
    }

    and if you want upgrade this even more, you add a method for building URLs from base URI:

    const base_uri = "https://od-api.oxforddictionaries.com/api/v1/"

    function buildURL(word) {
        return base_uri + config.source_lang + '/' + word
    }

    this method will save your time from writing base urls again and again..

    HOWEVER, nothings competes with a prebuilt node package.. does it?
*/

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

const wordList = [
    "domination",
    "philosophy",
    "revival",
    "dictionary",
    "intervention",
    "message",
    "control",
    "disorder",
    "product",
    "penalty",
    "fragrant",
    "arrangement",
    "inhabitant",
    "critical",
    "liberal",
    "digress",
    "curriculum",
    "trouble",
    "egg white",
    "elaborate",
    "abundant",
    "dialect",
    "emergency",
    "housing",
    "exemption",
    "precedent",
    "feather",
    "democratic",
    "concept",
    "community",
    "pasture",
    "comprehensive",
    "variable",
    "capture",
    "mention",
    "interference",
    "practical",
    "channel",
    "personality",
    "threshold"
]

async function wordOfDay() {
    await axios({
        url: "https://www.random.org/integers/?num=1&min=1&max=40&col=1&base=10&format=plain&rnd=new",
        method: "get",
    }).then(({ data }) => {
        let word = wordList[data-1]
        console.log("WORD OF THE DAY: ", word)
        wordAllDetails(word)
    }).catch(err => console.log(err))
}

// word game

async function wordGame() {
    await axios({
        url: "https://www.random.org/integers/?num=1&min=1&max=40&col=1&base=10&format=plain&rnd=new",
        method: "get",
    }).then(async ({ data }) => {
        let word = wordList[data-1]

        // fetching synonyms:
        let lookup = dict.synonyms(word.toLowerCase())
        let synonyms
        await lookup.then(res => {
            let results = res.results
            results.map(result => {
                synonyms = result.lexicalEntries[0].entries[0].senses[0].synonyms
            })
        }, err => {
            console.log(err)
        })

        console.log("Guess the word from following definition: ")
        await wordDefinition(word)

        let ip = "word" // fetch the word input here

        let match = Object.keys(synonyms).filter(({ text }) => {
            return text === ip
        })

        if (ip === word || match.length > 1) {
            console.log("Wow! you guessed it right!")
        } else {
            console.log("sorry, the word was: ", word)
            console.log("here's something about ", word, " :")
            wordAllDetails(word)
        }
    }).catch(err => console.log(err))
    
}

module.exports = { 
    wordDefinition,
    wordSynonymns,
    wordAntonyms,
    wordExamples,
    wordAllDetails,
    wordOfDay,
    wordGame
}