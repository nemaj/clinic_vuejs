module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,

    devServer: {
    	watchOptions: {
        poll: true
  		}
    },

    publicPath: process.env.NODE_ENV === 'development'
        ? './'
        : './'
}
