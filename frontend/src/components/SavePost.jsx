import React, { useState } from "react"
import "../styles/Post.css"
import { useNavigate } from "react-router-dom"
import { toggleLike } from "../api/social"
import { savePost } from "../api/social"

function SavePost({post, onRemove}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")
    const navigate = useNavigate()

    // new states for the liked state of the post and liking the post
    const [liked, setLiked] = useState(post.is_liked);
    const [likeCount, setLikeCount] = useState(post.like_count);
    const [save, setSavedByUser] = useState(post.is_saved_by_user);

    const handleLikeToggle = async () => {
        try {
            const res = await toggleLike(post.id);
            setLiked(res.data.liked);
            setLikeCount(res.data.like_count);
            console.log("API response", res.data);
        } catch (err) {
            console.error(err);
            alert("failed to like/unlike the post");
        }
    }

    const handleSaveLogic = async () => {
        try {
            const res = await savePost(post.id);
            setSavedByUser(res.data.is_saved_by_user);
            onRemove();
            console.log("API reponse", res.data);
        } catch (err) {
            console.error(err);
            alert("failed to save the post");
        }
    }

    return (
        <div className="post-container">
            <img className="post-image" src={post.image}></img>
            <p className="post-author" onClick={() => navigate(`/publicProfile/${post.author}`)}>
                Posted by: {post.author_username} 
            </p>
            <p className="post-title">Title: {post.title}</p>
            <p className="post-content">{post.content}</p>
            {
                post.location !== "" && (
                    <p className = "location">Location: {post.location}</p>
                )
            }
            {
                post.rating !== null && (
                    <p className = "rating">Rating: {"⭐".repeat(post.rating)}</p>
                )
            }
            <p className="post-date">{formattedDate}</p>
            <button className="post-like-button" onClick={handleLikeToggle}>
                {liked ? "❤️": "🤍"} {likeCount}
            </button>

            <button className="post-save-button" onClick={handleSaveLogic}>
                Remove from saved posts
            </button>
        </div>        
    );
}

export default SavePost