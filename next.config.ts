import type {NextConfig} from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    // Other config options here
    output: "standalone"
};

export default withMDX({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})(nextConfig);