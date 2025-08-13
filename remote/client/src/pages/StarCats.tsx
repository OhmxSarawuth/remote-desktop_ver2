import React from "react";

interface StarCatProps {
  username: string | null;
  token: string | null;
}

const StarCat: React.FC<StarCatProps> = ({ username, token }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">StarCat</h2>
      {/* <div>Username: {username}</div>
      <div>Token: {token}</div> */}
      {/* Add StarCat logic here */}
      <a href="https://www.google.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Help</a>
    </div>
  );
};

export default StarCat;
