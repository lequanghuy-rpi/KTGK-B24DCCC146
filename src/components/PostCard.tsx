import { Link } from "react-router-dom";
import { Post } from "../types/Post";

interface Props {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onDelete }) => {
  const handleDelete = () => onDelete(post.id);

  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-lg font-bold mt-3 line-clamp-2">{post.title}</h2>

      <p className="text-sm text-gray-600 mt-1">Tác giả: {post.author}</p>
      <p className="text-xs text-gray-400">{post.date}</p>

      <p className="mt-3 text-gray-700 line-clamp-3">
        {post.content.slice(0, 100)}...
      </p>

      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/posts/${post.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Đọc thêm
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default PostCard;
