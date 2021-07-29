const got = require('got');
const cheerio = require('cheerio');

got('https://github.com/suropark').then((res) => {
  $ = cheerio.load(res.body);

  const data = $('rect')
    .get()
    .map((rect) => {
      const count = $(rect).data('count');
      const date = $(rect).data('date');
      return { [date]: count };
    });

  //   console.log(data.slice(data.length - 7, -1));
  //   console.log(data.splice(200));
  //   console.log(date.toISOString().slice(0, 10).split('-'));
  //     // if (format === 'activity') return count > 0;
  //     // if (format === 'count') return count;
  //   })();
  // localStorage.setItem('id', sdf)
});
