import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compareByDate } from './recipe-summary.mjs';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);
}

export function getPostData(postIdentifier) {
  const slug = postIdentifier.replace(/\.md$/, ''); //removes the file extension
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    ...data,
    slug,
    content,
  };
}

export function getAllPosts() {
  return getPostsFiles().map(getPostData).sort(compareByDate);
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.isFeatured === true);
}
