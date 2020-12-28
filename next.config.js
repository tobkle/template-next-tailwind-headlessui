const withPlugins = require("next-compose-plugins")
const withYaml = require("next-plugin-yaml")

const nextConfig = {
    images: {
        domains: ["images.unsplash.com", "source.unsplash.com"],
    },
    webpack: (cfg) => {
        cfg.node = { fs: "empty" } // https://github.com/webpack-contrib/css-loader/issues/447
        cfg.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "gray-matter-loader" }],
        })
        return cfg
    },
}
module.exports = withPlugins([withYaml], nextConfig)
