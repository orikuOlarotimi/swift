// types/blog.ts
export interface Blog {
  id: string;
  userId: string;
  authorName: string;
  authorImage: string;
  image: string;
  heading: string;
  body: string;
  keyTakeaways: string[];
  categories: string[];
  date: string;
  likeCount: number;
  isLikedByMe: boolean;
  comments: string[];
}
