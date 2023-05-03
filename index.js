/* Author: Si Young Sung */

const serverless = require("serverless-http");
let apiKey = "hidden";
let path = require("path");
let bodyParser = require("body-parser");
let express = require("express"); /* Accessing express module */
const { exit } = require("process");
let app = express(); /* app is a request handler function */
var cors = require('cors')

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

/* openai */
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'))
app.use(express.json())

app.post("/checkAnswerAI", async function (request, response){
  let {originalQuestion, originalAnswer, userAnswer} = request.body
  let message = [
    {role: "user", content: `Here is a question from Civics (History and Government) Questions for the Naturalization Test:
    ${originalQuestion}

    Here are the list of correct answers to the question:
    ${originalAnswer}

    A person answered the question with:
    ${userAnswer}
    with a margin of small grammatical error, is this answer a passable answer to this question? Please respond with a yes or no, followed by an explanation`},
    ]

    let completion;
    try {
        completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: message
        });
    } catch (error) {
        console.log(error);
    }
    let ans = completion.data.choices[0].message['content']
    console.log("chat-gpt answers it with " + ans)
    response.send(JSON.stringify({response: ans}));
});

module.exports.handler = serverless(app);
