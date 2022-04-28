// module.exports = {
//   "publicPath": "",
//   "css": {
//     "loaderOptions": {
//       "sass": {
//         "data": "\n          @import \"@/styles/_variables.scss\";\n        "
//       }
//     }
//   },
//   "transpileDependencies": [
//     "vuetify"
//   ]
// }
publicPath: process.env.NODE_ENV === 'production'
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/DIAL_VirutalAssist_MobileApp/': '/',
    css: {
        loaderOptions: {
            scss: {
                prependData: "\n@import \"@/styles/_variables.scss\";\n"
            }
        }
    },
    transpileDependencies: [
        "vuetify"
    ]
};