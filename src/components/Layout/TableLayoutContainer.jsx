import PropTypes from "prop-types";

const TableLayoutContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center deep-black text-white">
      <div className="w-full max-w-5xl  p-6 black-bg rounded-2xl shadow-lg border-all border">
        {children}
      </div>
    </div>
  );
};
TableLayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableLayoutContainer;
