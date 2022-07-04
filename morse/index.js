const morse = require("morse-code-converter");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const english =req.query.plaintext;
    var code = "";
    //console.log(english);

    if (typeof english === 'undefined' || english === "") {
        code = "Please enter some text to  convert!"
    }
    else{
        code = morse.textToMorse(english);
        //console.log("enter here");
    }
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}