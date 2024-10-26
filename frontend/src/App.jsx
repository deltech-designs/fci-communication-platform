// src/App.js
import React, { useState } from "react";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import ThreadList from "./components/Chat/ThreadList";
import ThreadView from "./components/Chat/ThreadView";
import NewThreadForm from "./components/Chat/NewThreadForm";

function App() {
  const [user, setUser] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  return (
    <div>
      <RegisterForm />

      {!user ? (
        <>
          <LoginForm onLoginSuccess={setUser} />
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <ThreadList onSelectThread={setSelectedThread} />
          {selectedThread && <ThreadView thread={selectedThread} />}
          <NewThreadForm
            onCreateThread={(thread) => setSelectedThread(thread)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
