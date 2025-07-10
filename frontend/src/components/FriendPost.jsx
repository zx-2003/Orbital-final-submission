import React, { useState } from "react"
import NavigationBar from "./NavBar";
import "../styles/Post.css"
import { useNavigate } from "react-router-dom"
import { toggleLike } from "../api/social"

// this should be taking in the posts from the page created that provides template for all the posts.
// that will be Friend post in the pages section.

// now latest addition will be for like and unlike, same as previous explore page
function FriendPost({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("sgt")
    const navigate = useNavigate()

    const [liked, setLiked] = useState(post.is_liked);
    const [likeCount, setLikeCount] = useState(post.like_count);

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

    return (
            <div className="post-container">
                <img src={post.image} className="post-image"></img>
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
                <button style={{ border: "none" }} onClick={handleLikeToggle}>
                    {liked ? "❤️": "🤍"} {likeCount}
                </button>
            </div>
    );
}

export default FriendPost