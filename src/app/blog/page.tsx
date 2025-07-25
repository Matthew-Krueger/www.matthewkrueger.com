import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import StaticSection from '@/components/StaticSection';
import {Post} from '@/lib/types';

async function getPosts(): Promise<Post[]> {
    const postsDirectory = join(process.cwd(), 'content/posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames
        .map((filename) => {
            const filePath = join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const {data} = matter(fileContents);

            return {
                slug: filename.replace('.mdx', ''),
                frontmatter: data as Post['frontmatter'],
            };
        })
        // Sort by weight (ascending, if present) then date (descending)
        .sort((a, b) => {
            const weightA = a.frontmatter.weight ?? Number.MAX_SAFE_INTEGER;
            const weightB = b.frontmatter.weight ?? Number.MAX_SAFE_INTEGER;
            if (weightA !== weightB) return weightA - weightB;
            const dateA = new Date(a.frontmatter.date).getTime();
            const dateB = new Date(b.frontmatter.date).getTime();
            return dateB - dateA;
        });
}

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StaticSection>
                <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
            </StaticSection>
            <StaticSection>
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <Card
                        key={post.slug}
                        className="shadow-md hover:shadow-lg transition-shadow duration-200 mb-6"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                    {post.frontmatter.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {post.frontmatter.description && (
                                <p className="text-muted-foreground text-sm mb-2">
                                    {post.frontmatter.description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-2 mb-2 justify-center">
                                {post.frontmatter.categories?.map((category) => (
                                    <Badge key={category} variant="secondary">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {post.frontmatter.date instanceof Date
                                    ? post.frontmatter.date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        timeZone: 'UTC'
                                    })
                                    : post.frontmatter.date}
                                {post.frontmatter.author && ` by ${post.frontmatter.author}`}
                            </p>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
            </StaticSection>
        </div>
    );
}