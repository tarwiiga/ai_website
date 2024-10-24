import {allBlogs} from '../../.contentlayer/generated'
import {compareDesc} from 'date-fns'
import Link from 'next/link'
import Image from "next/image";
import * as React from "react"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Blogs",
}

export default function Home() {
    const blogs = allBlogs.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    )

    function formatDate(input: string | number) {
        const date = new Date(input);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    return (
        <div className="container max-w-4xl py-6 lg:py-10 mt-[100px]">
            {blogs.length ? (
                <div className="grid gap-10 sm:grid-cols-2">
                    {blogs.map((blog) => (
                        <article
                            key={blog.url}
                            className="group relative flex flex-col space-y-2"
                        >
                            {blog.image && (
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    width={804}
                                    height={452}
                                    className="border bg-muted transition-colors"
                                />
                            )}
                            {blog.date && (
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(blog.date)}
                                </p>
                            )}
                            <h2 className="text-2xl font-extrabold text-primary">
                                {blog.title}
                            </h2>
                            {blog.description && (
                                <p className="text-muted-foreground">{blog.description}</p>
                            )}



                            <Link href={blog.url} className="absolute inset-0">
                                <span className="sr-only">View Article</span>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No Blogs found</p>
            )}
        </div>
    )
}
