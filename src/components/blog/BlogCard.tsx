
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featured_image?: string;
  coverImage?: string; // Alternative property name used in related posts
  author: {
    name?: string;
    avatar?: string;
    full_name?: string;
    avatar_url?: string;
  };
  publishedAt?: string;
  published_at?: string;
  tags: string[];
  category?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  // Handle different property names that might come from different API responses
  const imageUrl = post.featured_image || post.coverImage || "";
  const authorName = post.author?.full_name || post.author?.name || "Anonymous";
  const authorAvatar = post.author?.avatar_url || post.author?.avatar || "";
  const publishDate = post.published_at || post.publishedAt || "";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(publishDate)}</span>
          </div>
        </div>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
        >
          {post.title}
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>

      <CardFooter className="flex items-center mt-auto pt-4 border-t">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={authorAvatar} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{authorName}</span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
