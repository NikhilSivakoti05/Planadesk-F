import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        mode === "register" ? "/auth/signup" : "/auth/login";

      const payload =
        mode === "register"
          ? form
          : { email: form.email, password: form.password };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // 🔥 REQUIRED FOR COOKIE JWT
        credentials: "include",

        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Authentication failed");
      }

      // ---------------- REGISTER ----------------
      if (mode === "register") {
        alert("Account created successfully. Please login.");
        setMode("login");
        return;
      }

      // ---------------- LOGIN ----------------
      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      /*
        ❌ DO NOT STORE TOKEN
        JWT is HttpOnly cookie — browser handles it
      */

      // ✅ Store only NON-SENSITIVE data
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", data.role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: form.email,
        })
      );

      navigate("/dashboard/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.card}>
        <div style={authStyles.header}>
          <h2 style={authStyles.title}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={authStyles.subtitle}>
            Enter your details to continue
          </p>
        </div>

        <form onSubmit={submit} style={authStyles.form}>
          {mode === "register" && (
            <div style={authStyles.row}>
              <input
                style={authStyles.input}
                name="firstName"
                placeholder="First Name"
                onChange={change}
                required
              />
              <input
                style={authStyles.input}
                name="lastName"
                placeholder="Last Name"
                onChange={change}
                required
              />
            </div>
          )}

          <input
            style={authStyles.input}
            name="email"
            type="email"
            placeholder="Email"
            onChange={change}
            required
          />

          <input
            style={authStyles.input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={change}
            required
          />

          {error && <div style={authStyles.error}>{error}</div>}

          <button
            type="submit"
            style={authStyles.button}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <button
          style={authStyles.toggle}
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}

/* -------------------- Styles -------------------- */
const authStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#65676b",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1877f2",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    color: "#d32f2f",
    fontSize: "13px",
    textAlign: "center",
  },
  toggle: {
    background: "none",
    border: "none",
    color: "#1877f2",
    marginTop: "16px",
    width: "100%",
    cursor: "pointer",
    fontSize: "14px",
  },
};
