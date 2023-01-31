const NewBlog = ({
  handleBlogSubmit,
  handleBlogInput,
  title,
  author,
  url,
  likes,
}) => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input name="title" value={title} onChange={handleBlogInput} />
        </div>
        <div>
          author:
          <input name="author" value={author} onChange={handleBlogInput} />
        </div>
        <div>
          url:
          <input name="url" value={url} onChange={handleBlogInput} />
        </div>
        <div>
          likes:
          <input name="likes" value={likes} onChange={handleBlogInput} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default NewBlog;
