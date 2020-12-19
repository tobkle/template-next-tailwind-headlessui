const withPlugins = require("next-compose-plugins")
const withYaml = require("next-plugin-yaml")
const nextConfig = {
    images: {
        domains: [],
    },
    webpack: (cfg) => {
        // console.log(JSON.stringify(cfg, null, 2))
        return cfg
    },
}
module.exports = withPlugins([withYaml], nextConfig)
