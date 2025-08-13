import React from "react";

interface SearchBranchProps {
  username: string | null;
  token: string | null;
}

const SearchBranch: React.FC<SearchBranchProps> = ({ username, token }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Search Branch</h2>
      {/* <div>Username: {username}</div>
      <div>Token: {token}</div> */}
      {/* Add search branch logic here */}
      <a href="https://www.google.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Help</a>
    </div>
  );
};

export default SearchBranch;
