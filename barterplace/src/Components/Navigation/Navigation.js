import React from "react";

const Navigation = ({ signOut }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        style={{ fontSize: "24px", margin: "1vw" }}
        onClick={() => {
          signOut();
          sessionStorage.clear();
        }}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
