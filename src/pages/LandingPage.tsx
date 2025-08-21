
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Maris Coin App</h1>
      {user ? (
        <>
          <p>Hoş geldin, {user.displayName || user.email}!</p>
          <button onClick={logout}>Çıkış Yap</button>
        </>
      ) : (
        <p>Lütfen giriş yap veya kayıt ol.</p>
      )}
    </div>
  );
}
