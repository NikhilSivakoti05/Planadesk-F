import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: "User", lastName: "" });
  const [role, setRole] = useState("USER");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedRole) setRole(storedRole);

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          firstName: parsed.firstName || "User",
          lastName: parsed.lastName || ""
        });
      } catch {
        setUser({ firstName: "User", lastName: "" });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <h2 style={styles.logoText}>DASHBOARD</h2>
        </div>
        <nav style={styles.nav}>
          <Link to="orders" style={{ ...styles.navItem, ...(isActive('orders') ? styles.activeNav : {}) }}>
            <span style={styles.icon}>📦</span> Orders
          </Link>
          <Link to="profile" style={{ ...styles.navItem, ...(isActive('profile') ? styles.activeNav : {}) }}>
            <span style={styles.icon}>👤</span> Profile
          </Link>
          <Link to="help" style={{ ...styles.navItem, ...(isActive('help') ? styles.activeNav : {}) }}>
            <span style={styles.icon}>❓</span> Help Center
          </Link>
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN */}
      <div style={styles.mainWrapper}>
        <header style={styles.topBar}>
          <Link to="/" style={styles.homeBtn}>← Back to Home</Link>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>{user.firstName?.[0] || "U"}</div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <span style={styles.userRole}>
                {role === "ADMIN" ? "Administrator" : "User"}
              </span>
            </div>
          </div>
        </header>

        <main style={styles.content}>
          <div style={styles.contentCard}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  layout: { display: "flex", height: "100vh", backgroundColor: "#f4f7fe", fontFamily: "'Inter', sans-serif" },
  sidebar: { width: "260px", backgroundColor: "#111c44", color: "#fff", display: "flex", flexDirection: "column" },
  logoArea: { padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  logoText: { fontSize: "20px", fontWeight: "800", color: "#fff", margin: 0, letterSpacing: "2px" },
  nav: { padding: "24px 16px", flex: 1 },
  navItem: { display: "flex", alignItems: "center", padding: "12px 16px", color: "#a3abbd", textDecoration: "none", borderRadius: "12px", marginBottom: "8px", transition: "0.3s" },
  activeNav: { backgroundColor: "#1b254b", color: "#fff" },
  icon: { marginRight: "12px" },
  logoutBtn: { margin: "20px", padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "rgba(255,50,50,0.1)", color: "#ff5c5c", cursor: "pointer", fontWeight: "600" },
  mainWrapper: { flex: 1, display: "flex", flexDirection: "column" },
  topBar: { height: "80px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid #e9edf7" },
  homeBtn: { textDecoration: "none", color: "#2b3674", fontWeight: "600", fontSize: "14px", padding: "8px 16px", borderRadius: "10px", backgroundColor: "#f4f7fe" },
  userProfile: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: { width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#4318ff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
  userInfo: { display: "flex", flexDirection: "column" },
  userName: { fontSize: "15px", fontWeight: "700", color: "#2b3674" },
  userRole: { fontSize: "12px", color: "#a3abbd" },
  content: { padding: "32px", overflowY: "auto" },
  contentCard: { backgroundColor: "#fff", borderRadius: "20px", padding: "24px", minHeight: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }
};
