const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);
    
    // TODO: assign the body variable the correct value
    const body = req.body;

    // parse the body
    const parts = multipart.Parse(body, boundary);

    const result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion;

    let objects = Object.values(emotions);

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));




    const gif = await findGifs(main_emotion);

   // context.log(gif);
    context.res = {
        body: gif
    };
    //console.log()
    console.log(gif)
    //context.done(); 
}

async function analyzeImage(img){
    //const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    //const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    const subscriptionKey = "2b46dc89f4624d6ba01b0b629dd94ad0"
    const uriBase = "https://placeholdeer-face-api.cognitiveservices.azure.com/"+ '/face/v1.0/detect'

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        
            //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type' : 'application/octet-stream',

            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();

    return data;
}
// key: 8ff4dba4295d47bfb08ce26e5f574238
// endpoint: https://jackysnakesfaceapi.cognitiveservices.azure.com/


async function findGifs(emotion){
/*
    const apiKey = "?api_key="+"0PYIEbp7nwShjYsE26eZJI86lO0YHFAa"
    const s = "?s="+emotion
    //COMPLETE THE CODE

    const apiResult = await fetch ("https://api.giphy.com/v1/gifs/translate"+apiKey+s);

    const jsonResult = await apiResult.json();

    return jsonResult.URLSearchParams;
*/
    const uriBase = "https://api.giphy.com/v1/gifs/translate"
    const apiKey = process.env.GIPHY_KEY;
    let params = new URLSearchParams({
        'api_key': apiKey,
        's': emotion,
        'limit': '1'
    })
    
    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + 
    params.toString())
    let jsonGifs = await resp.json();

    return jsonGifs.data.url;
    
}
