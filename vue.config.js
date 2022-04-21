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

module.exports = {
    publicPath: "",
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