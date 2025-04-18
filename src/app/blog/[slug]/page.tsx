import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import {PostProps} from "@/lib/types";

interface Params {
    slug: string;
}

async function getPost(slug: string): Promise<PostProps> {
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        frontmatter: data as PostProps['frontmatter'],
        content: contentHtml,
    };
}

export async function generateStaticParams(): Promise<Params[]> {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));
}

export default async function Post({ params }: { params: Params }) {
    const { frontmatter, content } = await getPost(params.slug);

    // Format date as string (e.g., "4/18/2025" in US)
    const formattedDate =
        frontmatter.date instanceof Date
            ? frontmatter.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            })
            : frontmatter.date;

    return (
        <div className="container">
            <h1>{frontmatter.title}</h1>
            <p>
                {formattedDate} by {frontmatter.author}
            </p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}