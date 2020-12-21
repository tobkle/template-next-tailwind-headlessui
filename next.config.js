const withPlugins = require("next-compose-plugins")
const withYaml = require("next-plugin-yaml")

const nextConfig = {
    images: {
        domains: [],
    },
    webpack: (cfg) => {
        cfg.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "gray-matter-loader" }],
        })
        // console.log(JSON.stringify(cfg, null, 2))
        return cfg
    },
}
module.exports = withPlugins([withYaml], nextConfig)
