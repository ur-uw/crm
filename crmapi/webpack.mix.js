const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .vue()
    .sass("resources/sass/app.scss", "public/css");

mix.disableNotifications();

mix.browserSync("http://crmdashboard.test");

mix.override(webpackConfig => {
    // BUG: vue-loader doesn't handle file-loader's default esModule:true setting properly causing
    // <img src="[object module]" /> to be output from vue templates.
    // WORKAROUND: Override mixs and turn off esModule support on images.
    // FIX: When vue-loader fixes their bug AND laravel-mix updates to the fixed version
    // this can be removed
    webpackConfig.module.rules.forEach(rule => {
        if (
            rule.test.toString() ===
            "/(\\.(png|jpe?g|gif|webp)$|^((?!font).)*\\.svg$)/"
        ) {
            if (Array.isArray(rule.use)) {
                rule.use.forEach(ruleUse => {
                    if (ruleUse.loader === "file-loader") {
                        ruleUse.options.esModule = false;
                    }
                });
            }
        }
    });
});
