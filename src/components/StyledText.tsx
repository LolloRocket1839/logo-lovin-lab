import React from 'react';

interface StyledTextProps {
  children: string;
  className?: string;
}

export const StyledText: React.FC<StyledTextProps> = ({ children, className = '' }) => {
  // Split text by & and wrap each & in a span with elegant styling
  const parts = children.split('&');
  
  if (parts.length === 1) {
    return <>{children}</>;
  }
  
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="ampersand-elegant">&</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
