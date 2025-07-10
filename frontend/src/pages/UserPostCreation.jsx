import { useState, useEffect } from "react";
import NavigationBar from "../components/NavBar"
import social from "../api/social";
import Post from "../components/Post"
import "../styles/Home.css"
import "../styles/Post.css"
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserPostCreation() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    const createPost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("rating", rating);
        formData.append("location", location);

        if (image) formData.append("image", image);

        social
            .post("/social/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 201) { alert("Post created"); navigate("/"); }
                else alert("Failed to make post");

            })
            .catch((err) => {
                console.error(err);
                alert("Failed to create post");
            });
    };

    return(
        <div>
            <NavigationBar />
            <div className="background">
                <h2 className="title">Create a Post</h2>
                <form onSubmit={createPost}>
                    <label htmlFor="image">Image:</label>
                    <br />
                    <input 
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <label htmlFor="location">Location:</label>
                    <br />
                    <textarea
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    ></textarea>

                    <label htmlFor="rating">Rating: </label>
                    <br />
                    <select 
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="" disabled hidden>
                            Select a rating
                        </option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <br />

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    )
}

export default UserPostCreation