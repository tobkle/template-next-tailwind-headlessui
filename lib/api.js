import fs from "fs"
import matter from "gray-matter"
import { join } from "path"
import { format, parse } from "date-fns"
import config from "cms/config.yaml"

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
}

export function getFieldsFromConfig(contentType) {
    const contentTypeFields = config.collections
        .filter((coll) => coll.name === contentType)[0]
        .fields.map((field) => field.name)
    contentTypeFields.push("content")
    return contentTypeFields
}

export function datVal(date) {
    return parse(date, "dd.MM.yyyy", new Date()).valueOf()
}

export function getAll(contentType = "posts", fields = []) {
    const slugs = getSlugs(contentType)
    const content = slugs
        .map((slug) => getBySlug(contentType, slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) =>
            datVal(post1.date) > datVal(post2.date) ? "-1" : "1"
        )
    return content
}

export function getSlugs(contentType) {
    const directory = join(process.cwd(), `content/${contentType}`)
    const filenames = fs.readdirSync(directory)
    const mdfiles = filenames.filter((f) => f.endsWith(".md"))
    return mdfiles
}

export function getBySlug(contentType, slug, fields) {
    const directory = join(process.cwd(), `content/${contentType}`)
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(directory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const items = {}

    function loadField(field) {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug
        }
        if (field === "content") {
            items[field] = content
        }
        if (field === "date") {
            items["datum"] = new Date(data[field]).valueOf()
            items[field] = format(new Date(data[field]), "dd.MM.yyyy")
        } else if (field === "collection") {
            let collection = {}
            if (data[field]) {
                collection.contentType = data[field]
                collection.fields = getFieldsFromConfig(collection.contentType)
                collection.content = getAll(
                    collection.contentType,
                    collection.fields
                )
            }
            items[field] = collection
        } else if (data[field]) {
            items[field] = data[field]
        }
    })
    return items
}
