var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader','css-loader']
      // },
    ],
  }
};

const client = {
  entry: `${SRC_DIR}/client.jsx`,
  output: {
    path: `${DIST_DIR}`,
    filename: 'app.js',
  }
};

const server = {
  target: 'node',
  entry: `${SRC_DIR}/server.jsx`,
  output: {
    path: `${DIST_DIR}`,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//        }
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader','css-loader']
//       }
//     ]
//   }
// };
