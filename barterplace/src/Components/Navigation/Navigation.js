import React from "react";
import { Button } from "@material-ui/core";

const Navigation = ({ signOut }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-left" }}>	  
		<Button
			variant="contained"
            size="large"
            color="primary"
            onClick={() => {
				signOut();
				sessionStorage.clear();
            }}
        >
        Sign Out
        </Button>
    </nav>
  );
};

export default Navigation;
