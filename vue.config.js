module.exports = {
    transpileDependencies: ["vuex-module-decorators"],
    pages: {
        admin: {
            entry: 'src/Pages/Admin/admin.js',
            template: 'public/admin.html',
            filename: 'admin.html'
        },
        user: {
            entry: 'src/Pages/User/user.js',
            template: 'public/user.html',
            filename: 'user.html'
        }
    },
    devServer: {
        historyApiFallback: {
            rewrites: [{
                    from: /\admin/,
                    to: '/admin.html',
                },
                {
                    from: /\/user/,
                    to: '/user.html',
                }
            ]
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /.html$/,
                loader: "vue-template-loader",
                exclude: [
                    /admin.html/,
                    /user.html/
                ],
            }]
        }
    },
    chainWebpack: config => config.plugins.delete('named-chunks')
}