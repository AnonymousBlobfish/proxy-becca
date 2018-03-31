const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);

//
const loadBundle = function(cache, item, filename) {
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    console.log('loading:', filename);
    cache[item] = require(filename).default;
    console.log(cache);
  }, 0);
};

// For each microservice, check if file exists for /{service}.js for either the client or the server
// If so, load it
// If not, fetch it
const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}${suffix}.js`;
    exists(filename)
      .then(() => {
        console.log('about to loadBundle');
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log(`Fetching: ${url}`);
          // see: https://www.npmjs.com/package/node-fetch
          fetch(url)
            .then(res => {
              console.log('filename is ', filename);
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            }).catch(err => {
              console.log(err);
            });
        } else {
          console.log('WARNING: Unknown fs error');
        }
      });
  });
};

const fetchBothBundles =  (clientPath, serverPath, services) => {
  // fetchBundles(clientPath, services);
  fetchBundles(serverPath, services, '-server', true);

  return services;
}

module.exports = fetchBothBundles;
