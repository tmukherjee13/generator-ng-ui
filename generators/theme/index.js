'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash-addons');
module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      type: 'input',
      name: 'theme',
      message: 'Which theme would you  like to use?',
      default: 'default'
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to install?',
      default: true,
      choices: [{
        name: 'Auth',
        value: 'auth',
        checked: true
      }, {
        name: 'User',
        value: 'user',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'setup',
      message: 'Would you like proceed with the setup?',
      default: true
    }];
    return this.prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      });
  }
  writing() {
    console.log(this.props.modules);
    let enabledModules = {};
    this.props.modules.map(m => enabledModules[m] = true );

    let config = function () {
      this.fs.copy(this.templatePath('config/bowerrc'), this.destinationPath('.bowerrc'));
      this.fs.copyTpl(this.templatePath('config/_bower.json'), this.destinationPath('bower.json'), {
        _: _,
        name: this.options.name
      });

      this.fs.copy(this.templatePath('files'), this.destinationPath('public'), {
        _: _,
        name: this.options.name
      });
      this.fs.copyTpl(this.templatePath('files/js/main.js'), this.destinationPath('public/js/main.js'), {
        _: _,
        name: this.options.name
      });

      this.fs.copyTpl(this.templatePath('files/js/config.js'), this.destinationPath('public/js/config.js'), {
        _: _,
        enabledModules: enabledModules
      });

      this.fs.copyTpl(this.templatePath('files/js/router.js'), this.destinationPath('public/js/router.js'), {
        _: _,
        enabledModules: enabledModules
      });

      this.fs.copyTpl(this.templatePath('files/index.html'), this.destinationPath('public/index.html'), {
        _: _,
        name: this.options.name,
        enabledModules: enabledModules
      });
    };
    config.call(this);
  }
  install() {
    // Install Dependencies
    // this.installDependencies();
  }
};
