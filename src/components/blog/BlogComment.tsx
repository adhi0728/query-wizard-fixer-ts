
import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentAuthor {
  full_name: string;
  avatar_url: string;
}

interface CommentProps {
  comment: {
    id: string;
    content: string;
    created_at: string;
    author: CommentAuthor;
  };
}

const BlogComment = ({ comment }: CommentProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy 'at' h:mm a");
  };

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.author.avatar_url} />
        <AvatarFallback>
          {comment.author.full_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{comment.author.full_name}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
