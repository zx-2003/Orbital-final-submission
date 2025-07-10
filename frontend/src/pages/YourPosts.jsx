import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function YourPosts() {
    const [posts, setPosts] = useState([]);
    const [ordering, setOrdering] = useState("-created_at");

    useEffect(() => {
        getPosts(ordering);
    }, [ordering]);

    const navigate = useNavigate();

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value);
    }

    // for generating the post list we will see on the homepage
    const getPosts = () => {
        social
            .get(`/social/posts/?ordering=${ordering}`)
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    // this will delete the posts
    const deletePost = (id) => {
        social
            .delete(`/social/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <NavigationBar />
            <div className="background">
                <h2 className="title">Your Posts</h2>
                <div className="filter-bar">
                    <select id="sort" onChange={handleOrderingChange} value={ordering}>
                        <option value="-created_at">Most Recent</option>
                        <option value="-like_count">Most Liked</option>
                    </select>
                </div>
                <div className="post-wrapper">
                    {posts.map((post) => (
                        <Post post={post} onDelete={deletePost} key = {post.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YourPosts;