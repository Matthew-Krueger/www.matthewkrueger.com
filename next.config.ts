import type {NextConfig} from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    // Other config options here
};

export default withMDX({
    extension: /\.mdx$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})(nextConfig);