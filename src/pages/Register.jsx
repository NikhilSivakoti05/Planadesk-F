import { useAuthLogic } from "../components/auth/AuthForm";

export default function Register() {
  const { form, handleChange, handleSubmit, loading, error, navigate } = useAuthLogic("register");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input style={styles.input} name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input style={styles.input} name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <input style={styles.input} name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button style={styles.button} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <span style={styles.link} onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  card: { background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "400px" },
  title: { textAlign: "center", marginBottom: "20px", color: "#1c1e21" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "10px" },
  input: { padding: "12px", border: "1px solid #ddd", borderRadius: "6px", width: "100%" },
  button: { padding: "12px", backgroundColor: "#42b72a", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
  error: { color: "red", fontSize: "12px", textAlign: "center" },
  footer: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
  link: { color: "#1877f2", cursor: "pointer", textDecoration: "underline" }
};