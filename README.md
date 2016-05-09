# express-rest
### A REST api utilizing  jwt auth and sequelize.
**Prequisites:**

1.  Install node.js [Get it here](https://nodejs.org/en/). Check if it installed correctly by typing (cmd/terminal): `node -v` you should get a version of node.
2.  Install vue-cli: `npm install -g vue-cli`
3.  Install any text editor:
    * [Sublime Text](http://www.sitepoint.com/essential-sublime-text-javascript-plugins/), and [Atom](https://atom.io/) are all great for this. **I highly recommend Atom**.
    * If you use atom, all of the extensions are optional. It really makes life better to use vue-snippets, language-vue, vue-format, and vue-autocomplete if you are working with the front-end. Another great add-on is merge-conflicts.
    * Some more great plugins: http://www.sitepoint.com/10-essential-atom-add-ons/

**Install Project**

1.  from the command line or git gui, clone the repository:
2.  cd into the directory from command line
3.  Install dependencies `npm install`
4.  Manually update sqlite3
    * `npm install nan@latest`
    * `rm -rf node_modules/sqlite3/node_modules/nan/`
    * `npm rebuild sqlite3 --build-from-source`

**WorkFlow**

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

Enjoy...
