const {override, fixBabelImports, addPostcssPlugins, addWebpackAlias, addLessLoader, addWebpackPlugin} = require('customize-cra');
const path = require('path');
const Webpack = require('webpack')
const {SplitChunksPlugin} = Webpack.optimize
const overrideConfig = () => config => {

  if (config) {
    if (config.mode == 'production') {
      config.output.publicPath = '/repairStatic/'
    }
  }
  return config;
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  // fixBabelImports('import',
  //   {
  //     libraryName: 'antd',
  //     libraryDirectory: 'es',
  //     // style: 'css',
  //   }
  // ),
  // fixBabelImports([
  //     [
  //       'import',
  //       {
  //         libraryName: 'antd-mobile',
  //         libraryDirectory: 'es',
  //         // style: 'css',
  //       }
  //     ],
  //     [
  //       'import',
  //       {
  //         libraryName: 'antd-mobile',
  //         libraryDirectory: 'es',
  //         style: 'css',
  //       }
  //     ]
  //   ]
  // ),
  overrideConfig(),
  addLessLoader({
    javascriptEnabled: true,
  }),
  // addWebpackPlugin(
  //   new Webpack.DefinePlugin({
  //     optimization: {
  //       splitChunks: {
  //         chunks: "all",
  //         minSize: 2000,
  //         minChunks: 1,
  //         maxAsyncRequests: 5,
  //         maxInitialRequests: 3,
  //         name: 'vendor',
  //       },
  //     }
  //   })
  // ),
  addPostcssPlugins([
    // require('postcss-plugin-px2rem')({
    //   rootValue: 75,
    //   minPixelValue: 1,
    //   selectorBlackList: ["canvas"],
    //   exclude: /node_modules|bootstrap/i,
    //   // propBlackList: ['border'],
    //   mediaQuery: true,
    // })
  ]),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
