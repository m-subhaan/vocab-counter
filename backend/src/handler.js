const vocab = require('./vocab');

exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body);
    const text = parsedBody.text;
    const words = text?.split(' ');
    const result = {};

    for (const word of words) {
        const type = vocab[word];
        if (type) {
            result[type] = (result[type] || 0) + 1;
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(result),
    };
};
