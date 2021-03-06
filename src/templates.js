/**
 * Original work Copyright (c) 2016 Philippe FERDINAND
 * Modified work Copyright (c) 2016 Kam Low
 *
 * @license MIT
 **/
'use strict';

var fs = require('fs');
var logger = require('./logger');
var path = require('path');
var handlebars = require('handlebars');
var helpers = require('./helpers');

module.exports = {
  // Loaded templates
  templates: {},

  // Load templates from the given directory
  load: function (templateDirectory) {
    fs.readdirSync(templateDirectory).forEach(
      function (filename) {
        var fullname = path.join(templateDirectory, filename);
        var template = handlebars.compile(fs.readFileSync(fullname, 'utf8'), {
          noEscape: true,
          strict: true,
        });
        this.templates[filename.match(/(.*)\.md$/)[1]] = template;
      }.bind(this)
    );
  },

  render: function (compound) {
    var template;

    logger.verbose('Rendering ' + compound.kind + ' ' + compound.fullname);

    switch (compound.kind) {
      case 'index':
        template = 'index';
        break;
      case 'page':
        template = 'page';
        break;
      case 'group':
      case 'namespace':
        if (!Object.keys(compound.compounds).length) return;

        if (
          Object.keys(compound.compounds).length === 1 &&
          compound.compounds[Object.keys(compound.compounds)[0]].kind ==
            'namespace'
        )
          return undefined;

        template = 'namespace';
        break;
      case 'class':
      case 'struct':
      case 'interface':
        template = 'class';
        break;
      default:
        logger.warn('Cannot render ' + compound.kind + ' ' + compound.fullname);
        console.log('Skipping ', compound);
        return undefined;
    }

    return this.templates[template](compound).replace(
      /(\r\n|\r|\n){3,}/g,
      '$1\n'
    );
  },

  summary: function (content) {
    return this.templates['summary'](content);
  },

  renderArray: function (compounds) {
    return compounds.map(
      function (compound) {
        return this.render(compound);
      }.bind(this)
    );
  },

  // Register handlebars helpers
  registerHelpers: function (options) {
    // Escape the code for a table cell.
    handlebars.registerHelper('cell', function (code) {
      return code.replace(/\|/g, '\\|').replace(/\n/g, '<br/>');
    });

    // Escape the code for a titles.
    handlebars.registerHelper('title', function (code) {
      return code.replace(/\n/g, '<br/>');
    });

    // Generate an anchor for internal links
    handlebars.registerHelper('anchor', function (name) {
      return helpers.getAnchor(name, options);
    });
  },
};
