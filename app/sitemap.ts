import type { MetadataRoute } from 'next'
import {allBlogs} from "../.contentlayer/generated";

const BASE_URL = "https://tarwiiga.com"

export default function sitemap(): MetadataRoute.Sitemap {

    const blogsEntries: MetadataRoute.Sitemap = allBlogs.map(blog => ({
        url: `${BASE_URL}${blog.url}`
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...blogsEntries
    ]
}