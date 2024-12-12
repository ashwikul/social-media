import Header from "./Header";
import Post from "./Post";

const Feed = () => {
  return (
    <div className="p-4">
      <Header />
      <h1 className="font-extrabold text-2xl mt-6 mb-4">Feeds</h1>
      <Post />
    </div>
  );
};

export default Feed;
