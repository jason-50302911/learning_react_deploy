import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import { format } from 'date-fns';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);


  useEffect(() => {
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const updatePost = { id: id, title: editTitle, datetime: datetime, body: editBody };
    editPost(updatePost);
    navigate(`/post/${id}`);
};

  return (
    <main className={editTitle ? "NewPost" : "Missing"}>
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input 
              id="editTitle"
              type="text" 
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => handleEdit(post.id)}>
                Sumbit
            </button>
          </form>
        </>
      }
      {!editTitle && 
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      }
    </main> 
  )
}

export default EditPost