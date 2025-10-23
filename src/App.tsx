import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import { useState } from "react";
import { Post } from "./types/Post";
import { samplePosts } from "./data/samplePosts";

function App() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  const addPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)));
  };

  const deletePost = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList posts={posts} onDelete={deletePost} />} />
        <Route path="/create" element={<PostForm onSubmit={addPost} />} />
        <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={deletePost} />} />
        <Route path="/posts/edit/:id" element={<PostForm posts={posts} onUpdate={updatePost} />} />
      </Routes>
    </div>
  );
}

export default App;
