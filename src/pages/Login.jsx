import AuthForm from "../components/auth/AuthForm";

export default function Login() {
  return <AuthForm />;
}
// import { useAuthLogic } from "../components/auth/AuthForm";

// export default function Login() {
//   const { form, handleChange, handleSubmit, loading, error, navigate } = useAuthLogic("login");

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             style={styles.input}
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             style={styles.input}
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           {error && <p style={styles.error}>{error}</p>}
//           <button style={styles.button} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p style={styles.footer}>
//           New here? <span style={styles.link} onClick={() => navigate("/register")}>Register here</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
//   card: { background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "350px" },
//   title: { textAlign: "center", marginBottom: "20px", color: "#1c1e21" },
//   form: { display: "flex", flexDirection: "column", gap: "15px" },
//   input: { padding: "12px", border: "1px solid #ddd", borderRadius: "6px" },
//   button: { padding: "12px", backgroundColor: "#1877f2", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
//   error: { color: "red", fontSize: "12px", textAlign: "center" },
//   footer: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
//   link: { color: "#1877f2", cursor: "pointer", textDecoration: "underline" }
// };