const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantsInfoRouter = require('./routes/routes.js');
const bundleRouter = require('./routes/bundleRouter.js');
const fileLoader = require('./fileloader.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s/');
// })

const clientBundlesPath = path.join(__dirname, './public/microservices');
const serverBundlesPath = path.join(__dirname, './templates/microservices');
const microservicesConfig = require('./microservice-config.json');
const services = fileLoader(clientBundlesPath, serverBundlesPath, microservicesConfig);
// Line above calls on fileLoader to get client and server bundles


////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const ReactDomServer = require('react-dom/server');

const Layout = require('./templates/indexLayout');
const App = require('./templates/app');
const Scripts = require('./templates/indexScripts');

// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  console.log('services is ', components);
  return Object.keys(components).map(item => {
    console.log('about to createElement from bundle');
    console.log('item is ', item);
    let component = React.createElement(components[item], props); // Props includes restaurantId
    console.log('component is ', component);
    console.log('renderedString is ', ReactDomServer.renderToString(component));
    return ReactDomServer.renderToString(component);
  });
}

// When visit ProxyIPAddress/restaurants/:id (initial)
app.get('/restaurants/:id', function(req, res){
  let components = renderComponents(services, {restaurantid: req.params.id}); // Find way to pass id?
  console.log(JSON.stringify(services));
  res.end(Layout(
    'Zagat',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

// app.get('/restaurants/:id/:widget/bundle.js', bundleRouter);
app.get('/api/restaurants/:id/:widget', function(req, res) {
  console.log('in proxy server api call');
  restaurantsInfoRouter(req, res);
});

app.listen(4001, () => {
  console.log('Proxy listening on port 4001');
});
