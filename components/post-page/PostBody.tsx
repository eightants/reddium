import React from 'react';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

interface PostBodyProps {
  content: string;
  className?: string;
}

const PostBody: React.FC<PostBodyProps> = ({ content, className }) => {
  const htmlContent = micromark(content, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  });

  return (
    <div 
      className={`post-body ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default PostBody;
