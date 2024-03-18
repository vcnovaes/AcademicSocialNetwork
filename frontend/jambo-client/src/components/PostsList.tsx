import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { IPostRequest, PostsClient } from "../clients/PostsClient";

const PostList = () => {
  const userId = localStorage.getItem("user_id") ?? "";
  const token = localStorage.getItem("JamboAuthCookie") ?? "";
  const [posts, setPosts] = useState<IPostRequest[]>([]);
  const [newPost, setNewPost] = useState<IPostRequest>({
    owner: userId,
    text: "",
  });
  const [editPostId, setEditPostId] = useState<string>(""); // Track the ID of the post being edited
  const [updatedPostText, setUpdatedPostText] = useState<string>(""); // Track the updated text for the edited post

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const fetchPosts = async () => {
    try {
      const response = await PostsClient.get(userId, token);
      if (!response) {
        throw new Error("Failed to fetch posts");
      }
      const data = response;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId: string | undefined) => {
    if (postId == undefined) return;
    try {
      await PostsClient.delete(postId, token);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = (postId: string | undefined) => {
    if (postId == undefined) return;
    setEditPostId(postId);
    // Find the post being edited and set its text in the input field
    const postToUpdate = posts.find((post) => post.id === postId);
    if (postToUpdate) {
      setUpdatedPostText(postToUpdate.text);
    }
  };

  const handleInputChange = (e: any) => {
    setUpdatedPostText(e.target.value);
  };

  const handleSubmitNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await PostsClient.create({ text: newPost.text, owner: userId }, token);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleSubmit = async (postId: string | undefined) => {
    if (postId === undefined) return;
    try {
      await PostsClient.update({ owner: userId, text: updatedPostText }, token);
      // Update the text of the post in the UI
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, text: updatedPostText } : post
        )
      );
      setEditPostId("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmitNewPost}>
        <label>
          Text:
          <input
            type="text"
            name="text"
            value={newPost.text}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>

      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {editPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={updatedPostText}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleSubmit(post.id)}>Submit</button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Owner:</strong> {post.owner}
                </p>
                <p>
                  <strong>Text:</strong> {post.text}
                </p>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => handleUpdate(post.id)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
