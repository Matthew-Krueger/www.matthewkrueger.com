import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import {Post} from "@/lib/types";
import PageBase from "@/components/PageBase";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

async function getPosts(): Promise<Post[]> {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const {data} = matter(fileContents);

        return {
            slug: filename.replace('.mdx', ''),
            frontmatter: data as Post['frontmatter'],
        };
    });
}

export default async function Blog() {
    const posts = await getPosts();

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card
                            key={post.slug}
                            className="shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                                        {post.frontmatter.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">
                                    {post.frontmatter.date instanceof Date
                                        ? post.frontmatter.date.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })
                                        : post.frontmatter.date}{' '}
                                    by {post.frontmatter.author}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}