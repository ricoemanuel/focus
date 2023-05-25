import { CommentPost } from "./comment.post.model";

export interface Post {
    id?: string;
    title: string;
    userId?: string;
    autor: string;
    description: string;
    document: string;
    likes?: number;
    likesBy?: string[];
    comments?: CommentPost[];
  }
  