import { useState, useEffect } from "react";
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import FriendPost from "../components/FriendPost";

function FriendPosts() {
    const [posts, setPosts] = useState([]);
    // new logic for filtering
    const [ordering, setOrdering] = useState("-created_at")

    useEffect(() => {
        getExplorePosts(ordering);
    }, [ordering]);

    const getExplorePosts = () => {
        social
            .get(`/social/following_posts/?ordering=${ordering}`)
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value);
    }

    return (
        <div>
            <NavigationBar />
            <div className="background">
                <h2 className="title">See what your friends have been up to</h2>

                <div className="filter-bar">
                    <select id="sort" onChange={handleOrderingChange} value={ordering}>
                        <option value="-created_at">Most Recent</option>
                        <option value="-like_count">Most Liked</option>
                    </select>
                </div>

                <div className="post-wrapper">
                    {posts.map((post) => (
                        <FriendPost post={post} key = {post.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendPosts