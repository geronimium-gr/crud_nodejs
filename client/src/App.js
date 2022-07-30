import React, { useState } from "react";
import ViewUsers from "./ViewUsers/ViewUsers";
import AddUsers from "./AddUsers/AddUsers";

function App() {
  const [refreshData, setRefreshData] = useState(false);
  const refreshToggle = () => setRefreshData(!refreshData);

  return (
    <div>
      <AddUsers refreshData={refreshData} refreshToggle={refreshToggle} />
      <ViewUsers refreshData={refreshData} refreshToggle={refreshToggle} />
    </div>
  );
}

export default App;
