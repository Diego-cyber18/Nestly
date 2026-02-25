const { useState, useEffect, useMemo } = React;

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Budget Famiglia</h1>
      <p>App.jsx caricato correttamente ✅</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
