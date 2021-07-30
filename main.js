const got = require('got');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  const _user = event.queryStringParameters.user; // {user : userId}
  const list = await got(`https://github.com/${_user}`).then((res) => {
    let $ = cheerio.load(res.body);
    let data = {};
    $('rect')
      .get()
      .map((rect) => {
        const date = $(rect).data('date');
        const count = $(rect).data('count');
        data = { ...data, [date]: count };
      });
    return data;
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return response;
};
