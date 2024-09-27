import { Box, Text, Button, Image, IconButton, Textarea, Link } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import EmojiPicker from 'emoji-picker-react';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // Send like/unlike request to backend
  };

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment, user: 'Current User' }]);
      setComment('');
      // Send comment to backend
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // Send follow/unfollow request to backend
  };

  const handleEmojiClick = (event, emojiObject) => {
    setComment(comment + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      {/* User Info */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Link as={RouterLink} to={`/profile/${post.user.id}`}>
          <Text fontWeight="bold">{post.user.name}</Text>
        </Link>
        <Button size="sm" onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Box>
      
      {/* Post Content */}
      <Text mb={2}>{post.content}</Text>
      {post.image && (
        <Image src={post.image} alt="Post image" borderRadius="md" mb={2} />
      )}
      
      {/* Post Actions */}
      <Box display="flex" alignItems="center" gap={4}>
        <IconButton
          icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          onClick={handleLike}
          aria-label="Like"
          size="lg"
        />
        <Text>{likes} likes</Text>

        <IconButton
          icon={<AiOutlineComment />}
          aria-label="Comment"
          size="lg"
          onClick={() => document.getElementById(`comment-${post.id}`).focus()}
        />
        <Text>{comments.length} comments</Text>
      </Box>

      {/* Comment Section */}
      <Box mt={4}>
        <Textarea
          id={`comment-${post.id}`}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleComment}>Post Comment</Button>
          <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            {showEmojiPicker ? 'Close Emoji Picker' : 'Add Emoji'}
          </Button>
        </Box>
        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        )}
      </Box>

      {/* List Comments */}
      <Box mt={4}>
        {comments.map((comment, index) => (
          <Box key={index} mb={2}>
            <Text>
              <Link as={RouterLink} to={`/profile/${comment.user}`}>
                {comment.user}
              </Link>: {comment.text}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Post Date */}
      <Text fontSize="sm" color="gray.500">
        {formatDistanceToNow(new Date(post.createdAt))} ago
      </Text>
    </Box>
  );
};

export default Post;
