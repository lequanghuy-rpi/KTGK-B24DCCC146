import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../types/Post";

interface PostFormProps {
  onSubmit?: (post: Post) => void;
  onUpdate?: (post: Post) => void;
  posts?: Post[];
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onUpdate, posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const existingPost = posts?.find(p => p.id === Number(id));

  const [formData, setFormData] = useState({
    title: existingPost?.title || "",
    author: existingPost?.author || "",
    thumbnail: existingPost?.thumbnail || "",
    content: existingPost?.content || "",
    category: existingPost?.category || "Khác",
  });

  // Khi có existingPost thì cập nhật lại form
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        author: existingPost.author,
        thumbnail: existingPost.thumbnail,
        content: existingPost.content,
        category: existingPost.category,
      });
    }
  }, [existingPost]);

  // Hàm cập nhật state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Kiểm tra hợp lệ dữ liệu
  const validate = (): boolean => {
    const { title, author, content } = formData;
    if (title.trim().length < 10) return alert("Tiêu đề phải ít nhất 10 ký tự!"), false;
    if (author.trim().length < 3) return alert("Tác giả phải ít nhất 3 ký tự!"), false;
    if (content.trim().length < 50) return alert("Nội dung phải ít nhất 50 ký tự!"), false;
    return true;
  };

  // Khi nhấn Đăng bài / Cập nhật
  const handleSubmit = () => {
    if (!validate()) return;

    const newPost: Post = {
      id: existingPost ? existingPost.id : Date.now(),
      ...formData,
      date: existingPost ? existingPost.date : new Date().toISOString().split("T")[0],
    };

    if (isEditMode && onUpdate) {
      onUpdate(newPost);
      alert("Cập nhật thành công!");
      navigate(`/posts/${newPost.id}`);
    } else if (onSubmit) {
      onSubmit(newPost);
      alert("Đăng bài thành công!");
      navigate("/");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tiêu đề"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Tác giả"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="thumbnail"
        value={formData.thumbnail}
        onChange={handleChange}
        placeholder="URL ảnh thumbnail"
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        rows={10}
        placeholder="Nội dung bài viết..."
        className="border p-2 w-full mb-3 rounded"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="Công nghệ">Công nghệ</option>
        <option value="Du lịch">Du lịch</option>
        <option value="Ẩm thực">Ẩm thực</option>
        <option value="Đời sống">Đời sống</option>
        <option value="Khác">Khác</option>
      </select>

      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Cập nhật" : "Đăng bài"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default PostForm;
