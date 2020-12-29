/**
 * Splitted the huge config.json file into its collection members
 * copied the child config.json files into the respective folders
 *
 * This function reads all child config.json files out of the content
 * folders and assembles them back into a huge config.json
 */
import fs from "fs"
import path from "path"
import loadedConfig from "./config.json"

export default function buildConfig(cmsContentFolder = "content") {
    let newConfig = loadedConfig
    // get all folders within the cms content folder:
    let folders = fs
        .readdirSync(path.join(cmsContentFolder), {
            withFileTypes: true,
        })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

    // get all files in the root of these folders
    // which are matching the name: /^config*(nnn).json$/
    // meaning the name must start with config and end with .json
    // in between there can be additional characters
    // if there are also digits in the name, then these digits are treated as the sequence within the collections
    // in which order they are presented to the CMS users in the admin area
    let files = []
    folders.forEach((folder) => {
        fs.readdirSync(path.join(cmsContentFolder, folder), {
            withFileTypes: true,
        })
            .filter((dirent) => dirent.isFile())
            .map((dirent) => dirent.name)
            .filter((name) => name.match(/^config.*.json$/))
            .map((name) => {
                const pathname = path.join(cmsContentFolder, folder, name)
                const sequence = parseInt(
                    name.match(/^config\D*(\d*)\.json$/)[1] || 0
                )
                files.push({ sequence, pathname })
            })
    })

    // sort by sequence number if there is one provided
    files.sort((a, b) => {
        if (parseInt(a.sequence) < parseInt(b.sequence)) return -1
        if (parseInt(a.sequence) > parseInt(b.sequence)) return 1
        return 0
    })

    // read the child collection data out of the config files and add it to the collection
    files.forEach((file) => {
        const fileContent = fs.readFileSync(file.pathname)
        if (fileContent) {
            const collection = JSON.parse(fileContent)
            newConfig.collections.push({ ...collection })
        }
    })

    // return it
    return newConfig
}
