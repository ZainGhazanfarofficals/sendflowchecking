import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", padding: "8px", background: "rgba(230, 230, 230, 0.1)", display: "flex", flexDirection: "column", gap: "2", margin: "6" }}>
        <div>
          Name: <span style={{ fontWeight: "bold" }}>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span style={{ fontWeight: "bold" }}>{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          style={{ background: "red", color: "white", fontWeight: "bold", padding: "6px", marginTop: "3" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
