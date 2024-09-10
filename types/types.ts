// Updated types.ts with additional fields for posts like coverImage, category, tags, and published.

export interface PostData {
  title: string;
  content: string;
  summary:string;
  author: string; 
  coverImage?: string;  // Optional field for cover image
  category?: string;  // Optional field for category
  tags?: string[];    // Optional field for tags
  published?: boolean; // Optional field to mark if post is published
}

export interface PostResponse extends PostData {
  _id: string;
}

export interface UpdatePostData {
  id: string;
  title: string;
  content: string;
  coverImage?: string;  // Allow cover image update
  category?: string;    // Allow category update
  tags?: string[];      // Allow tags update
  published?: boolean;  // Allow published status update
}

export interface DeletePostData {
  id: string;
}
