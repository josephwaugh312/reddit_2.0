// Mock for framer-motion
module.exports = {
  motion: {
    div: ({ children, ...props }) => {
      const { whileHover, whileTap, initial, animate, exit, transition, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    button: ({ children, ...props }) => {
      const { whileHover, whileTap, initial, animate, exit, transition, ...validProps } = props;
      return <button {...validProps}>{children}</button>;
    },
    span: ({ children, ...props }) => {
      const { whileHover, whileTap, initial, animate, exit, transition, ...validProps } = props;
      return <span {...validProps}>{children}</span>;
    },
    img: ({ ...props }) => {
      const { whileHover, whileTap, initial, animate, exit, transition, ...validProps } = props;
      return <img {...validProps} />;
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}; 