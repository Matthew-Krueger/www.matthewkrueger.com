
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StaticSection from '@/components/StaticSection';
import {Frontmatter, PostProps} from '@/lib/types';
import { Code, Pre } from '@/components/mdx/Code';

interface Params {
    slug: string;
}

async function getPost(slug: string): Promise<{ frontmatter: Frontmatter; source: string }> {
    const filePath = join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        frontmatter: data as PostProps['frontmatter'],
        source: content,
    };
}

export async function generateStaticParams(): Promise<Params[]> {
    const postsDirectory = join(process.cwd(), 'content/posts');
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

export default async function Post({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const { frontmatter, source } = await getPost(slug);

    const formattedDate =
        frontmatter.date instanceof Date
            ? frontmatter.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timeZone: 'UTC'
            })
            : frontmatter.date;

    return (
        <>
            <StaticSection>
                <h1 className="text-4xl font-bold mb-4 text-center">{frontmatter.title}</h1>
                {frontmatter.description && (
                    <p className="text-muted-foreground text-lg mb-4 text-center">
                        {frontmatter.description}
                    </p>
                )}
                <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {frontmatter.categories?.map((category) => (
                        <Badge key={category} variant="secondary">
                            {category}
                        </Badge>
                    ))}
                </div>
                <p className="italic font-light text-center">
                    {formattedDate}
                    {frontmatter.author && ` by ${frontmatter.author}`}
                </p>
                <p className="italic font-light text-center align-middle justify-center text-xs w-1/2 mx-auto">
                    While accessible on all devices,
                    content such as complex code and visual diagrams in this
                    article may be more comfortably viewed on a larger screen.
                </p>
            </StaticSection>
            <StaticSection className="w-11/12">
                <div className="mdx-content">
                    <MDXRemote
                        source={source}
                        components={{
                            pre: Pre,
                            code: Code,
                        }}
                    />
                </div>
                <Button variant="outline" asChild className="mt-8">
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </StaticSection>
        </>
    );
}