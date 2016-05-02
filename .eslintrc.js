module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      //allow 2 space indent
      'indent': ['off'],
      //enforce auto semi insertion
      'semi': ['off'],
      //space after function name
      'space-before-function-paren': ['off'],
      //multiple blank lines
      'no-multiple-empty-lines': ['off'],
      //extra binding
      'no-extra-bind': ['off']
  }
}
