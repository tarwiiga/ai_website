import {allBlogs} from '../../../.contentlayer/generated'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import React, {HTMLAttributes} from "react";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import Link from "next/link";
import {Text} from "@chakra-ui/react";
import {format, parseISO} from "date-fns";

export async function generateStaticParams() {
    return allBlogs.map((blog) => ({
        slug: blog._raw.flattenedPath,
    }))
}

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata | undefined> {
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)

    if (!blog) {
        return
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            images: [{
                url: blog.image!!,
            }],
        },
    }
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const useMDXComponent = (code: string) => {
    const fn = new Function('React', 'runtime', code);
    return fn(React, runtime).default;
};

type ComponentsProps = HTMLAttributes<HTMLElement>;

const components = {
    h1: ({className, ...props}: ComponentsProps) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold text-primary tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h2: ({className, ...props}: ComponentsProps) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold text-primary tracking-tight first:mt-0",
                className,
            )}
            {...props}
        />
    ),
    h3: ({className, ...props}: ComponentsProps) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold text-primary tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h4: ({className, ...props}: ComponentsProps) => (
        <h4
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold text-primary tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h5: ({className, ...props}: ComponentsProps) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold text-primary tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h6: ({className, ...props}: ComponentsProps) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold text-primary tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    a: ({className, ...props}: ComponentsProps) => (
        <a
            className={cn(
                "font-medium underline text-primary underline-offset-4",
                className,
            )}
            {...props}
        />
    ),
    p: ({className, ...props}: ComponentsProps) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({className, ...props}: ComponentsProps) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({className, ...props}: ComponentsProps) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({className, ...props}: ComponentsProps) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({className, ...props}: ComponentsProps) => (
        <blockquote
            className={cn(
                "[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
                className,
            )}
            {...props}
        />
    ),
    img: ({
              className,
              alt,
              ...props
          }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={cn("rounded-md border", className)} alt={alt} {...props} />
    ),
    hr: ({...props}) => <hr className="my-4 md:my-8" {...props} />,
    table: ({className, ...props}: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("even:bg-secondary m-0 border-t p-0", className)}
            {...props}
        />
    ),
    th: ({className, ...props}: ComponentsProps) => (
        <th
            className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
    td: ({className, ...props}: ComponentsProps) => (
        <td
            className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
    pre: ({className, ...props}: ComponentsProps) => (
        <pre
            className={cn(
                "mb-4 mt-6 overflow-x-auto text-sm  rounded-lg border bg-gray-800 py-4",
                className,
            )}
            {...props}
        />
    ),
    code: ({className, ...props}: ComponentsProps) => (
        <code
            className={cn(
                "relative rounded px-[2rem] py-[0.2rem] bg-gray-800 text-white font-code font-light !text-sm",
                className,
            )}
            {...props}
        />
    ),
    Image,
};

interface MdxProps {
    code: string;
    components?: Record<string, React.ComponentType>;
}

function Mdx({code}: MdxProps) {
    const Component = useMDXComponent(code);

    return (
        <div>
            <Component components={components}/>
        </div>
    );
}

const BlogLayout = ({params}: { params: { slug: string } }) => {
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)

    if (!blog) {
        notFound()
    }

    function formatDate(input: string | number) {
        const date = new Date(input);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mt-[100px]">
            <div>
                <div className="flex justify-center items-center space-x-2 text-sm">
                    <time className="text-gray-500 dark:text-gray-400" dateTime={blog.date}>
                        {formatDate(blog.date)}
                    </time>
                </div>
                <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                    {blog.title}
                </h1>

                <div className="flex justify-center text-gray-800 dark:text-gray-400">
                    <Link href={`/author/`}>
                        {"Mustafa A. Elghrib"}
                    </Link>
                </div>


                {blog.image && (
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={720}
                        height={405}
                        priority
                        className="my-8 border bg-muted transition-colors"
                    />
                )}
                <Mdx code={blog.body.code}/>
                <AuthorCard/>
            </div>
        </article>
    )
}

function AuthorCard() {
    return (
        <div
            className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400 mt-[50px]">
            <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
                <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
                    <Image
                        src={"/tarwiiga_logo.png"}
                        alt={""}
                        className="rounded-full object-cover"
                        fill
                        sizes="96px"
                    />
                </div>
                <div>
                    <div className="mb-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                            {"Mustafa A. Elghrib"}
                        </h3>
                    </div>
                    <div>
                        <Text>
                            Experienced AI Engineer with a Bachelor's degree in Computer Engineering and a
                            specialization in Artificial Intelligence from Stanford University via Coursera.
                            Over the past 4 years, I have worked on AI and software development projects across
                            industries like advertising, marketing, healthcare, and finance, helping businesses
                            unlock the potential of AI for improved performance and efficiency.
                        </Text>
                    </div>
                    <div className="mt-3 flex flex-row gap-5">
                        <Link
                            href={`https://www.linkedin.com/in/maelghrib`}
                            target="_blank"
                            className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            LinkedIn
                        </Link>
                        <Link
                            href={`https://www.x.com/maelghrib`}
                            target="_blank"
                            className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            Twitter (X)
                        </Link>
                        <Link
                            href={`https://www.github.com/maelghrib`}
                            target="_blank"
                            className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogLayout