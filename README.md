# mikhailsemochkin.com

> Personal website of Mikhail Semochkin 

## 1. Build

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

##2. Run
``` bash
# You should have MongoDB and Node installed
# (after npm run build)
node app.js <admin login> <admin password> <session secret>
```