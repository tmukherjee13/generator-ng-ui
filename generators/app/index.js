'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash-addons');
module.exports = class extends Generator {
  constructor(arg, opts) {
    super(arg, opts);
    this.option('front');
    this.appPool = (this.options.front ? 'frontend' : 'backend');
  }
  prompting() {
    this.log(yosay('Welcome to the astonishing ' + chalk.red('generator-ng-ui') + ' generator!'));
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'url',
      message: 'Your project\'s url',
      default: 'http://localhost'
    }];
    return this.prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      });
  }
  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
    // Copy the configuration files
    let config = function () {
      this.fs.copyTpl(this.templatePath('config/_package.json'), this.destinationPath('package.json'), {
        _: _,
        name: this.props.name,
        props: this.props
      });
      // If webpack is enabled
      // this.fs.copyTpl(this.templatePath('config/_webpack.config.js'), this.destinationPath('webpack.config.js'), {
      //   _: _
      // });
    };
    // Copy application files
    let app = function () {
      this.composeWith('ng-ui:theme', {
        theme: 'default',
        name: this.props.name
      });
    };
    config.call(this);
    app.call(this);
  }
  install() {
    // Install Dependencies
    // this.installDependencies();
  }
};
