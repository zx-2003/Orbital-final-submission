import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import PostExplore from "../components/PostExplore";
import SavePost from "../components/SavePost";

function SavedPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getSavedPosts();
    }, []);

    const getSavedPosts = () => {
        social
            .get('/social/saved_posts/')
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }

    const removeFromPosts = (postId) => {
        setPosts((prev) => prev.filter((post) => post.id != postId))
    }

    return (
        <div>
            <NavigationBar />
            <div className="background">
                <h2 className="title">Saved posts</h2>

                <div className="post-wrapper">
                    {posts.map((post) => (
                        <SavePost post={post} key = {post.id} onRemove = {() => removeFromPosts(post.id)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SavedPosts