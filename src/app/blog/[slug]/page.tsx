import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import remarkMdx from 'remark-mdx';
import remarkHtml from 'remark-html';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import StaticSection from '@/components/StaticSection';
import {PostProps} from '@/lib/types';

interface Params {
    slug: string;
}

async function getPost(slug: string): Promise<PostProps> {
    const filePath = join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(remarkMdx)
        .use(remarkHtml)
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        frontmatter: data as PostProps['frontmatter'],
        content: contentHtml,
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
    const { slug } = await params; // Await params to fix error
    const { frontmatter, content } = await getPost(slug);

    const formattedDate =
        frontmatter.date instanceof Date
            ? frontmatter.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
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
            </StaticSection>
            <StaticSection>
                <div className="mdx-content">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <Button variant="outline" asChild className="mt-8">
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </StaticSection>
        </>
    );
}