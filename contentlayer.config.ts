import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'The title of the blog',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the blog',
            required: true,
        },
        description: {
            type: 'string',
            description: 'The description of the blog',
            required: true,
        },
        image: {
            type: 'string',
            description: 'The image of the blog',
            required: false,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'blogs',
    documentTypes: [Blog],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'one-dark-pro',
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted']
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
    },
})