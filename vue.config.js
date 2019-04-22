// import u from './src/utils/u'
module.exports = {
    css: {
        modules: true,
        loaderOptions: {
            postcss: {
                // // 添加进来
                // 'postcss-pxtorem': {
                //     rootValue: 10,
                //     unitPrecision: 5,
                //     propList: ['*', '!font-size', '!line-height'],
                //     selectorBlackList: [],
                //     minPixelValue: 12
                // },
                // 'postcss-theme-variables': {
                //     vars: {
                //         white: '#000'
                //     },
                //     prefix: '$'
                // }
            }
        }
    }
}