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
  source?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<any[]>("/posts");
  return response.data.map(p => ({
    ...p,
    author: {
      id: p.id,
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

export const createPost = async (post: CreatePostPayload): Promise<Post> => {
  const response = await api.post<any>("/posts", post);
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

export const updatePost = async (slug: string, post: CreatePostPayload): Promise<Post> => {
  const response = await api.put<any>(`/posts/${slug}`, post);
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

export const deletePost = async (slug: string): Promise<void> => {
  await api.delete(`/posts/${slug}`);
};

export const getPostByCategory = async (category: string): Promise<Post[]> => {
  const response = await api.get<any[]>(`/posts?category=${category}`);
  return response.data.map(p => ({
    ...p,
    author: {
      id: p.id,
      name: p.authorName,
      avatar: p.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
    }
  }));
};

export const getPostBySearch = async (search: string): Promise<Post[]> => {
  const response = await api.get<any[]>(`/posts?search=${search}`);
  return response.data.map(p => ({
    ...p,
    author: {
      id: p.id,
      name: p.authorName,
      avatar: p.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
    }
  }));
};
