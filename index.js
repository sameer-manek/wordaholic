const axios = require('axios')

const api_id = "7f2b66ee"
const api_key = "9cabb81443299fff4bdd52d0242e5b8a"

const langauage = 'en'

const base_uri = "https://od-api.oxforddictionaries.com/api/v1/"

async function request(url) {
    return await axios.get({
        url,
        headers: {
            api_id,
            api_key
        }
    }).then(({ result }) => (result)).catch(err => console.log(err))
}

// word definition

async function wordDefinition(word) {
    console.log("this is called")
}

// word synonyms

// word antonyms

// word examples

// word all details, definitions, synonyms, antonyms, examples

// word of the day with all details

// word game

module.exports = { wordDefinition }