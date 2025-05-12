
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronRight, Clock, Tag } from "lucide-react";
import { toast } from "sonner";

// Components
import BlogCommentForm from "@/components/blog/BlogCommentForm";
import BlogComment from "@/components/blog/BlogComment";
import BlogCard from "@/components/blog/BlogCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Mock API functions
import { fetchBlogPost, fetchComments, fetchRelatedPosts } from "@/lib/api";

const BlogDetailPage = () => {
  const { id } = useParams();

  // Fetch blog post details
  const { 
    data: post, 
    isLoading: isPostLoading, 
    error: postError 
  } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => fetchBlogPost(id as string),
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load blog post: ${error.message}`);
      }
    }
  });

  // Fetch comments
  const { 
    data: comments = [], 
    isLoading: isCommentsLoading,
    error: commentsError
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id as string),
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load comments: ${error.message}`);
      }
    }
  });

  // Handle the form submission for comments
  const handleCommentSubmit = (data: { content: string }) => {
    toast.success("Comment submitted successfully!");
    console.log("Comment submitted:", data);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  // Fetch related posts
  const { 
    data: relatedPosts = [], 
    isLoading: isRelatedLoading,
    error: relatedError
  } = useQuery({
    queryKey: ["relatedPosts", post?.category, post?.id],
    queryFn: () => fetchRelatedPosts(post?.category, post?.id),
    enabled: !!post?.id,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load related posts: ${error.message}`);
      }
    }
  });

  if (isPostLoading) {
    return <BlogLoadingSkeleton />;
  }

  if (postError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog Post</h1>
        <p className="text-gray-600 mb-6">We couldn't load the blog post you were looking for.</p>
        <Button asChild variant="default">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="default">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <Link to="/blog" className="text-gray-500 hover:text-primary">
          Blog
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{post.title}</span>
      </div>

      {/* Featured Image */}
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8">
        <img 
          src={post.featured_image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Metadata */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.author?.avatar_url} />
              <AvatarFallback>{post.author?.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author?.full_name}</p>
              <p className="text-sm text-gray-500">{formatDate(post.published_at)}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{post.readingTime} read</span>
          </div>
          
          <div>
            <Badge variant="secondary">{post.category}</Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string, index: number) => (
            <div key={index} className="flex items-center text-sm text-gray-500">
              <Tag className="w-3 h-3 mr-1" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags Section */}
      <div className="mb-10">
        <h3 className="text-lg font-medium mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
        
        {isCommentsLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <BlogComment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic mb-6">No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4">Leave a Comment</h4>
          <BlogCommentForm onSubmit={handleCommentSubmit} />
        </div>
      </div>

      {/* Related Posts */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
        
        {isRelatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No related posts found.</p>
        )}
      </div>
    </div>
  );
};

// Loading skeleton component
const BlogLoadingSkeleton = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <Skeleton className="h-10 w-3/4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
};

export default BlogDetailPage;
