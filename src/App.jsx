import { useState, useEffect } from "react";
import ApiKeyGate from "./components/ApiKeyGate.jsx";
import TJAGeoSystem from "./TJAGeoSystem.jsx";

export default function App() {
  const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const [apiKey, setApiKey] = useState(
    envKey || (typeof window !== "undefined" ? localStorage.getItem("anthropic_api_key") : null)
  );

  useEffect(() => {
    if (envKey) setApiKey(envKey);
  }, [envKey]);

  if (!apiKey) {
    return (
      <ApiKeyGate
        onSave={(key) => {
          localStorage.setItem("anthropic_api_key", key);
          setApiKey(key);
        }}
      />
    );
  }

  return <TJAGeoSystem apiKey={apiKey} />;
}
