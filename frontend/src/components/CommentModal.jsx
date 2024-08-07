import React, { useState } from 'react';

const CommentModal = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // 发送评论请求
    onSubmit(comment);
  };

  return (
    <div className="comment-modal">
      <textarea 
        placeholder="Add A Review" 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CommentModal;
