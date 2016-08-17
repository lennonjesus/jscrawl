var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.guiadecompra.com/categorias/';

request(url, function(error, response, html) {

  if(!error) {
    var $ = cheerio.load(html);

    var categorias = [];

    var parent, cat;

    $('.categorias-nivel > *').each(function(i, elem) {

      if (elem.name === 'h1') {
        parent = $(this).text();
      }

      if (elem.name === 'p') {
        cat = {
          name: $(this).text(),
          parent: parent
        }

        categorias.push(cat);
      }

    });
  }

  fs.writeFile('output.json', JSON.stringify(categorias, null, 4), function(err) {
    console.log('File ok.');
  });
});
