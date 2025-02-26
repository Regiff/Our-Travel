"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { PostTypes } from "types/postTypes";
import Input from "../ui/Input";

// Assume that deletePost is a function to delete posts, e.g., an API call
const deletePost = async (postId: string) => {
  // Your logic to delete the post (e.g., fetch API call to your server)
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    // Handle successful deletion (e.g., redirect or show success message)
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const DeletePosts: React.FC<{ post: PostTypes }> = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    // Call deletePost when the user confirms
    await deletePost(post.id);
    setShowModal(false); // Close the modal after deletion
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        aria ="delete post"
        onClick={() => setShowModal(true)}
        text="Delete"
        action
      />

      {showModal && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="w-screen h-screen bg-black/40 absolute" />
            <div
              className="bg-white p-6 rounded shadow-lg z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Are you sure you want to delete this post?
              </p>
              <div className="flex gap-3 mt-5">
                <Button
                  aria ="confirm delete post"
                  onClick={handleDelete}
                  text="Yes"
                />
                <Button
                  aria="cancel delete post"
                  onClick={closeModal}
                  text="No"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletePosts;
