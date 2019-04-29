module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    //baseUrl: '/src/components',
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#178cff',
                    'link-color': '#178cff',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    }
}