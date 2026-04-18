import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share2, Bookmark, ChevronDown, ChevronUp, Send, ThumbsUp, ThumbsDown, MoreVertical, CornerDownRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './PostCard.css';

const PostCard = ({ post, type = 'discussion', onResultClick, onLike, onRepost, onComment, onSave }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [commentSort, setCommentSort] = useState('top');
  const [visibleComments, setVisibleComments] = useState(5);

  const handleLike = () => {
    if (onLike) {
      onLike();
    }
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (onComment) {
      onComment(newComment);
    }
    
    const c = { 
      _id: Date.now(), 
      author: { username: 'you', fullName: 'You' }, 
      content: newComment, 
      replies: [], 
      createdAt: new Date(),
      likes: 0,
      dislikes: 0
    };
    setComments(prev => [c, ...prev]);
    setNewComment('');
  };

  const handleRepost = () => {
    if (onRepost) {
      onRepost();
    }
    setReposted(!reposted);
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    setSaved(!saved);
  };

  const handlePostClick = () => {
    setExpanded(!expanded);
    setShowComments(!expanded); // Show comments when expanding
    onResultClick?.();
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 5);
  };

  const sortedComments = comments
    .sort((a, b) => {
      if (commentSort === 'top') {
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, visibleComments);

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now';

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-author-info">
          <div className="author-avatar">
            {post.author?.profilePicture
              ? <img src={post.author.profilePicture} alt={post.author.username} />
              : <span>{post.author?.fullName?.[0]?.toUpperCase() || post.author?.username?.[0]?.toUpperCase() || 'G'}</span>
            }
          </div>
          <div>
            <div className="author-name">
              {post.author?.fullName && <span className="author-full-name">{post.author.fullName}</span>}
              <span className="author-username">@{post.author?.username || 'gnotro_user'}</span>
            </div>
            <div className="post-time">{timeAgo}</div>
          </div>
        </div>
        <span className={`post-type-badge ${type}`}>{type === 'discussion' ? 'Discuss' : 'Article'}</span>
      </div>

      {/* Cover image for articles */}
      {type === 'article' && post.coverImage && (
        <div className="post-cover" onClick={handlePostClick}>
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      {/* Content */}
      <div className="post-body" onClick={handlePostClick}>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">
          {expanded ? post.content : post.content?.substring(0, 200)}
          {!expanded && post.content?.length > 200 && '...'}
        </p>
        {!expanded && (
          <div className="expand-hint">Click to read more and view comments</div>
        )}
      </div>

      {/* Action bar */}
      <div className="post-actions">
        <button className={`action-btn ${liked ? 'active-like' : ''}`} onClick={handleLike}>
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          <span>{likes}</span>
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={18} />
          <span>{comments.length}</span>
        </button>
        <button className={`action-btn ${reposted ? 'active-repost' : ''}`} onClick={handleRepost}>
          <Repeat2 size={18} />
          <span>{(post.reposts?.length || 0) + (reposted ? 1 : 0)}</span>
        </button>
        <button className="action-btn">
          <Share2 size={18} />
        </button>
        <button className={`action-btn ml-auto ${saved ? 'active-save' : ''}`} onClick={handleSave}>
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Comments Header */}
          <div className="comments-header">
            <h4>{comments.length} Comments</h4>
            <div className="sort-options">
              <button
                className={`sort-btn ${commentSort === 'top' ? 'active' : ''}`}
                onClick={() => setCommentSort('top')}
              >
                Top comments
              </button>
              <button
                className={`sort-btn ${commentSort === 'newest' ? 'active' : ''}`}
                onClick={() => setCommentSort('newest')}
              >
                Newest first
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="comments-list">
            {sortedComments.map(c => (
              <CommentItem key={c._id} comment={c} />
            ))}
            {comments.length > visibleComments && (
              <button className="load-more-btn" onClick={loadMoreComments}>
                Show {Math.min(5, comments.length - visibleComments)} more replies
              </button>
            )}
          </div>

          {/* Comment Input - Slim bottom bar */}
          <div className="comment-input-bar">
            <div className="comment-input-avatar">
              <span>Y</span>
            </div>
            <form onSubmit={handleComment} className="comment-input-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="comment-input-field"
              />
              {newComment.trim() && (
                <button type="submit" className="comment-submit-btn">
                  <Send size={16} />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState(comment.replies || []);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplies(prev => [...prev, {
      _id: Date.now(),
      author: { username: 'you', fullName: 'You' },
      content: reply,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0
    }]);
    setReply('');
    setShowReplyInput(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="comment-item">
      <div className="comment-avatar">
        <span>{comment.author?.username?.[0]?.toUpperCase() || 'U'}</span>
      </div>
      <div className="comment-content">
        <div className="comment-meta">
          <span className="comment-author">{comment.author?.fullName || comment.author?.username || 'User'}</span>
          <span className="comment-time">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
        </div>
        <p className="comment-text">{comment.content}</p>
        <div className="comment-actions">
          <button className={`action-btn ${liked ? 'active' : ''}`} onClick={handleLike}>
            <ThumbsUp size={14} fill={liked ? 'currentColor' : 'none'} />
            <span>{(comment.likes || 0) + (liked ? 1 : 0)}</span>
          </button>
          <button className={`action-btn ${disliked ? 'active' : ''}`} onClick={handleDislike}>
            <ThumbsDown size={14} fill={disliked ? 'currentColor' : 'none'} />
            <span>{comment.dislikes || 0}</span>
          </button>
          <button className="action-btn reply-btn" onClick={() => setShowReplyInput(!showReplyInput)}>
            <CornerDownRight size={14} />
          </button>
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="reply-input-compact">
            <div className="reply-input-avatar">
              <span>Y</span>
            </div>
            <form onSubmit={handleReply} className="reply-input-form">
              <input
                type="text"
                placeholder={`Reply to ${comment.author?.fullName || comment.author?.username || 'User'}...`}
                value={reply}
                onChange={e => setReply(e.target.value)}
                className="reply-input-field"
                autoFocus
              />
              <button type="submit" className="reply-submit-btn" disabled={!reply.trim()}>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Replies */}
        {replies.length > 0 && (
          <div className="replies-section">
            <button className="show-replies-btn" onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              View {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            </button>
            {showReplies && (
              <div className="replies-list">
                {replies.map(r => (
                  <div key={r._id} className="reply-item">
                    <div className="reply-avatar">
                      <span>{r.author?.username?.[0]?.toUpperCase() || 'U'}</span>
                    </div>
                    <div className="reply-content">
                      <div className="reply-meta">
                        <span className="reply-author">{r.author?.fullName || r.author?.username || 'User'}</span>
                        <span className="reply-time">{formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}</span>
                      </div>
                      <p className="reply-text">{r.content}</p>
                      <div className="reply-actions">
                        <button className="action-btn">
                          <ThumbsUp size={12} />
                          <span>{r.likes || 0}</span>
                        </button>
                        <button className="action-btn">
                          <ThumbsDown size={12} />
                        </button>
                        <button className="action-btn reply-btn">
                          <CornerDownRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
