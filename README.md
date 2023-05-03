# awsAPI
A code that I used for my website for backend (amazon aws lambda to use openai with nodejs/express)
Easiest way to use nodejs/express with amazon aws is to use serverless (https://www.serverless.com/)

If you want to replicate it, then do the following

Replace the origin from corsOptions to whatever website that will call the api.

# Example

```
const corsOptions ={
  origin:'https://testing.com', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
```

This will allow testing.com to POST data to the api-address that amazon-aws will give you, while blocking POSTs from other websites.

And lastly, set apikey in configuratino to your openai apikey. You can optionally use the amazon aws lambda's environment variables and set the api key there and use process.env to retreive it.

# Example
*Set the environment variable named API_KEY in Amazon AWS, then call*
```
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
```

*Or you can just do this, but make sure you don't publically upload a code with your apikey in it.*
*It's very likely that your apikey will get deactiviated once GitGuardian detects it*
```
let apiKey = "YOUR API KEY";
const configuration = new Configuration({
  apiKey: apiKey,
});
```
