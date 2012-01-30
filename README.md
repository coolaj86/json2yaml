JSON to YAML
===

The purpose of this utility is to pretty-print JSON in the human-readable YAML object notation
(ignore the misnomer, it's not a markup language at all)

You see, JSON is a proper subset of YAML, The difference is that YAML can use whitespace instead of syntax, which is more human-readable.
Also, YAML supports comments.

So, for all the times you want to turn JSON int YAML (YML):

    {
      "foo": "bar",
      "baz": [
        "qux",
        "quxx"
      ],
      "corge": null,
      "grault": 1,
      "garply": true,
      "waldo": "false",
      "fred": "undefined"
    }

becomes

    ---
      foo: "bar"
      baz:
        - "qux"
        - "quxx"
      corge: null
      grault: 1
      garply: true
      waldo: "false"
      fred: "undefined"

Usage
---

Specify a file:

    json2yaml ./example.json

    yaml2json ./example.kml | json2yaml

Or pipe from stdin:

    curl -s http://foobar3000.com/echo/echo.json | json2yaml

    wget -qO- http://foobar3000.com/echo/echo.json | json2yaml

Or require:

   (function () {
      "use strict";

      var YAML = require('json2yaml')
        , ymlText
        ;

      ymlText = YAML.stringify({
          "foo": "bar"
        , "baz": "corge"
      });

      console.log(ymlText);
    }()); 

Installation
---

    npm install -g json2yaml
