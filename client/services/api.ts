import axios from "axios";
import { Post } from "../types";

export type CreatePostPayload = {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt?: string;
  readingTime?: string;
  image?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<any[]>("/posts");
  return response.data.map(p => ({
    ...p,
    author: {
      id: p.id, // Using post ID as placeholder since API doesn't return author ID
      name: p.authorName,
      avatar: p.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
    }
  }));
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const response = await api.get<any>(`/posts/${slug}`);
  const p = response.data;
  return {
    ...p,
    author: {
      id: p.id,
      name: p.authorName,
      avatar: p.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
    }
  };
};

export const getPostByCategory = async (category: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?category=${category}`);
  return response.data;
};

export const getPostByTag = async (tag: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?tag=${tag}`);
  return response.data;
};

export const getPostByAuthor = async (author: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?author=${author}`);
  return response.data;
};

export const getPostBySearch = async (search: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?search=${search}`);
  return response.data;
};

export const createPost = async (post: CreatePostPayload): Promise<Post> => {
  const response = await api.post<Post>("/posts", post);
  return response.data;
};

