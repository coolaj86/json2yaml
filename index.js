(function () {
  "use strict";

  var typeOf = require('remedial').typeOf,
    maxText = 60,
    wrap = require('wordwrap')(maxText);

  function stringify(data) {
    var handlers = '';
    var indentLevel = -1;
    var indent = '  ';

    handlers = {
      "undefined": function () {
        // objects will not have `undefined` converted to `null`
        // as this may have unintended consequences
        // For arrays, however, this behavior seems appropriate
        return 'null';
      },
      "null": function () {
        return 'null';
      },
      "number": function (x) {
        return x;
      },
      "boolean": function (x) {
        return x ? 'true' : 'false';
      },
      "string": function (x) {
        var output = '|';
        if (x.length <= maxText && x.indexOf('\n') === -1) {
          return JSON.stringify(x);
        }
        var text = wrap(x).split(/\\n|\n/);
        indentLevel++;
        text.forEach(function (y) {
          output += '\n' + indent.repeat(indentLevel) + y;

        });
        indentLevel--;

        return output;
      },
      "date": function (x) {
        return x.toJSON();
      },
      "array": function (x) {
        var output = '';

        if (0 === x.length) {
          output += '[]';
          return output;
        }

        indentLevel++;
        x.forEach(function (y) {
          // TODO how should `undefined` be handled?
          var handler = handlers[typeOf(y)];

          if (!handler) {
            throw new Error('what the crap: ' + typeOf(y));
          }

          output += '\n' + indent.repeat(indentLevel) + '- ' + handler(y);

        });
        indentLevel--;

        return output;
      },
      "object": function (x) {
        var output = '';

        if (0 === Object.keys(x).length) {
          output += '{}';
          return output;
        }

        indentLevel++;
        Object.keys(x).forEach(function (k) {
          var val = x[k],
            handler = handlers[typeOf(val)];

          if ('undefined' === typeof val) {
            // the user should do
            // delete obj.key
            // and not
            // obj.key = undefined
            // but we'll error on the side of caution
            return;
          }

          if (!handler) {
            throw new Error('what the crap: ' + typeOf(val));
          }

          output += '\n' + indent.repeat(indentLevel) + k + ': ' + handler(val);
        });
        indentLevel--;

        return output;
      },
      "function": function () {
        // TODO this should throw or otherwise be ignored
        return '[object Function]';
      }
    };

    return '---' + handlers[typeOf(data)](data) + '\n';
  }

  module.exports.stringify = stringify;
}());
