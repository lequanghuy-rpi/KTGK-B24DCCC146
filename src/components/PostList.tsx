import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "../types/Post";
import { Link } from "react-router-dom";

interface Props {
  posts: Post[];
  onDelete: (id: number) => void;
}

function PostList({ posts, onDelete }: Props) {
  const [search, setSearch] = useState("");

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Danh sách bài viết ({filtered.length})
        </h2>
        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          Viết bài mới
        </Link>
      </div>

      <input
        type="text"
        placeholder="Tìm bài viết..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
