import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="h-12 w-12 rounded-full border-4 border-slate-300 border-t-blue-600 animate-spin"></div>
    </div>
  );
};

export default Loading;
