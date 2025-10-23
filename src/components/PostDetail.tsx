import { useParams, useNavigate, Link } from "react-router-dom";
import { Post } from "../types/Post";

interface Props {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostDetail: React.FC<Props> = ({ posts, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div className="p-6 text-center text-red-500">Bài viết không tồn tại!</div>;
  }

  
  const handleDelete = () => {
    onDelete(post.id);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-80 object-cover rounded shadow"
      />

      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>

      <div className="mt-2 text-gray-600">
        <p>
          <span className="font-semibold">Tác giả:</span> {post.author}
        </p>
        <p>
          <span className="font-semibold">Ngày đăng:</span> {post.date}
        </p>
        {post.category && (
          <p className="text-gray-500 italic">Chủ đề: {post.category}</p>
        )}
      </div>

      <p className="mt-4 leading-relaxed text-gray-700">{post.content}</p>

      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
        >
          Quay lại
        </button>

        <Link
          to={`/posts/edit/${post.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Chỉnh sửa
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Xóa bài viết
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
