// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const API = import.meta.env.VITE_API_BASE_URL;

// // export default function AuthForm() {
// //   const [mode, setMode] = useState("login");
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: ""
// //   });
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();

// //   const change = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const submit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const endpoint =
// //         mode === "register" ? "/auth/signup" : "/auth/login";

// //       const payload =
// //         mode === "register"
// //           ? form
// //           : { email: form.email, password: form.password };

// //       const res = await fetch(`${API}${endpoint}`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },

// //         // 🔥 REQUIRED FOR COOKIE JWT
// //         credentials: "include",

// //         body: JSON.stringify(payload),
// //       });

// //       if (!res.ok) {
// //         const msg = await res.text();
// //         throw new Error(msg || "Authentication failed");
// //       }

// //       // ---------------- REGISTER ----------------
// //       if (mode === "register") {
// //         alert("Account created successfully. Please login.");
// //         setMode("login");
// //         return;
// //       }

// //       // ---------------- LOGIN ----------------
// //       const data = await res.json();

// //       console.log("LOGIN RESPONSE:", data);

// //       /*
// //         ❌ DO NOT STORE TOKEN
// //         JWT is HttpOnly cookie — browser handles it
// //       */

// //       // ✅ Store only NON-SENSITIVE data
// //       localStorage.setItem("loggedIn", "true");
// //       localStorage.setItem("role", data.role);
// //       localStorage.setItem(
// //         "user",
// //         JSON.stringify({
// //           firstName: data.firstName,
// //           lastName: data.lastName,
// //           email: form.email,
// //         })
// //       );

// //       navigate("/dashboard/orders");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={authStyles.container}>
// //       <div style={authStyles.card}>
// //         <div style={authStyles.header}>
// //           <h2 style={authStyles.title}>
// //             {mode === "login" ? "Welcome Back" : "Create Account"}
// //           </h2>
// //           <p style={authStyles.subtitle}>
// //             Enter your details to continue
// //           </p>
// //         </div>

// //         <form onSubmit={submit} style={authStyles.form}>
// //           {mode === "register" && (
// //             <div style={authStyles.row}>
// //               <input
// //                 style={authStyles.input}
// //                 name="firstName"
// //                 placeholder="First Name"
// //                 onChange={change}
// //                 required
// //               />
// //               <input
// //                 style={authStyles.input}
// //                 name="lastName"
// //                 placeholder="Last Name"
// //                 onChange={change}
// //                 required
// //               />
// //             </div>
// //           )}

// //           <input
// //             style={authStyles.input}
// //             name="email"
// //             type="email"
// //             placeholder="Email"
// //             onChange={change}
// //             required
// //           />

// //           <input
// //             style={authStyles.input}
// //             name="password"
// //             type="password"
// //             placeholder="Password"
// //             onChange={change}
// //             required
// //           />

// //           {error && <div style={authStyles.error}>{error}</div>}

// //           <button
// //             type="submit"
// //             style={authStyles.button}
// //             disabled={loading}
// //           >
// //             {loading
// //               ? "Please wait..."
// //               : mode === "login"
// //               ? "Sign In"
// //               : "Sign Up"}
// //           </button>
// //         </form>

// //         <button
// //           style={authStyles.toggle}
// //           onClick={() =>
// //             setMode(mode === "login" ? "register" : "login")
// //           }
// //         >
// //           {mode === "login"
// //             ? "New here? Create an account"
// //             : "Already have an account? Log in"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // /* -------------------- Styles -------------------- */
// // const authStyles = {
// //   container: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     minHeight: "100vh",
// //     backgroundColor: "#f0f2f5",
// //   },
// //   card: {
// //     width: "100%",
// //     maxWidth: "400px",
// //     padding: "40px",
// //     backgroundColor: "#fff",
// //     borderRadius: "12px",
// //     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //   },
// //   header: {
// //     textAlign: "center",
// //     marginBottom: "24px",
// //   },
// //   title: {
// //     fontSize: "24px",
// //     fontWeight: "700",
// //     marginBottom: "8px",
// //   },
// //   subtitle: {
// //     color: "#65676b",
// //     fontSize: "14px",
// //   },
// //   form: {
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "16px",
// //   },
// //   row: {
// //     display: "flex",
// //     gap: "10px",
// //   },
// //   input: {
// //     padding: "12px",
// //     borderRadius: "8px",
// //     border: "1px solid #ddd",
// //     fontSize: "15px",
// //     outline: "none",
// //   },
// //   button: {
// //     padding: "12px",
// //     borderRadius: "8px",
// //     border: "none",
// //     backgroundColor: "#1877f2",
// //     color: "#fff",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //   },
// //   error: {
// //     color: "#d32f2f",
// //     fontSize: "13px",
// //     textAlign: "center",
// //   },
// //   toggle: {
// //     background: "none",
// //     border: "none",
// //     color: "#1877f2",
// //     marginTop: "16px",
// //     width: "100%",
// //     cursor: "pointer",
// //     fontSize: "14px",
// //   },
// // };


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_BASE_URL;

// export default function AuthForm() {
//   const [mode, setMode] = useState("login");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   /* ---------- RESPONSIVE HANDLER (UI ONLY) ---------- */
//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMobile(window.innerWidth < 900);
//     };
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   const change = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const endpoint =
//         mode === "register" ? "/auth/signup" : "/auth/login";

//       const payload =
//         mode === "register"
//           ? form
//           : { email: form.email, password: form.password };

//       const res = await fetch(`${API}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const msg = await res.text();
//         throw new Error(msg || "Authentication failed");
//       }

//       if (mode === "register") {
//         alert("Account created successfully. Please login.");
//         setMode("login");
//         return;
//       }

//       const data = await res.json();

//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", data.role);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: form.email,
//         })
//       );

//       navigate("/dashboard/orders");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* TOP BAR */}
//       <div style={styles.topBar}>
//         <button
//           style={styles.backButton}
//           onClick={() => navigate("/")}
//         >
//           ← Back to Home
//         </button>
//       </div>

//       <div
//         style={{
//           ...styles.container,
//           flexDirection: isMobile ? "column" : "row",
//         }}
//       >
//         {/* LEFT IMAGE (HIDDEN ON MOBILE) */}
//         {!isMobile && (
//           <div style={styles.imageSection}>
//             <div style={styles.overlay}>
//               <h1 style={styles.imageTitle}>Welcome Back</h1>
//               <p style={styles.imageText}>
//                 Secure access to your dashboard and orders.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* FORM */}
//         <div style={styles.formSection}>
//           <div style={styles.card}>
//             <h2 style={styles.title}>
//               {mode === "login" ? "Sign In" : "Create Account"}
//             </h2>

//             <form onSubmit={submit} style={styles.form}>
//               {mode === "register" && (
//                 <div style={styles.row}>
//                   <input
//                     style={styles.input}
//                     name="firstName"
//                     placeholder="First Name"
//                     onChange={change}
//                     required
//                   />
//                   <input
//                     style={styles.input}
//                     name="lastName"
//                     placeholder="Last Name"
//                     onChange={change}
//                     required
//                   />
//                 </div>
//               )}

//               <input
//                 style={styles.input}
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 onChange={change}
//                 required
//               />

//               {/* PASSWORD */}
//               <div style={styles.passwordWrapper}>
//                 <span
//                   style={styles.eyeIcon}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </span>

//                 <input
//                   style={styles.passwordInput}
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   onChange={change}
//                   required
//                 />
//               </div>

//               {error && (
//                 <div style={styles.error}>{error}</div>
//               )}

//               <button
//                 type="submit"
//                 style={styles.button}
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : mode === "login"
//                   ? "Sign In"
//                   : "Sign Up"}
//               </button>
//             </form>

//             <button
//               style={styles.toggle}
//               onClick={() =>
//                 setMode(
//                   mode === "login" ? "register" : "login"
//                 )
//               }
//             >
//               {mode === "login"
//                 ? "New here? Create an account"
//                 : "Already have an account? Log in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_BASE_URL;

// export default function AuthForm() {
//   const [mode, setMode] = useState("login");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const abortRef = useRef(null);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   /* ---------- RESPONSIVE HANDLER ---------- */
//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMobile(window.innerWidth < 900);
//     };
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   const change = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (abortRef.current) {
//       abortRef.current.abort();
//     }

//     const controller = new AbortController();
//     abortRef.current = controller;

//     try {
//       const endpoint =
//         mode === "register" ? "/auth/signup" : "/auth/login";

//       const payload =
//         mode === "register"
//           ? form
//           : { email: form.email, password: form.password };

//       const res = await fetch(`${API}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//         signal: controller.signal,
//       });

//       if (!res.ok) {
//         throw new Error("Invalid email or password");
//       }

//       if (mode === "register") {
//         alert("Account created successfully. Please login.");
//         setMode("login");
//         return;
//       }

//       const data = await res.json();

//       // ❗ UI-only state (backend is authority)
//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", data.role);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: form.email,
//         })
//       );

//       navigate("/dashboard/orders");
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         setError("Invalid email or password");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.topBar}>
//         <button
//           style={styles.backButton}
//           onClick={() => navigate("/")}
//         >
//           ← Back to Home
//         </button>
//       </div>

//       <div
//         style={{
//           ...styles.container,
//           flexDirection: isMobile ? "column" : "row",
//         }}
//       >
//         {!isMobile && (
//           <div style={styles.imageSection}>
//             <div style={styles.overlay}>
//               <h1 style={styles.imageTitle}>Welcome Back</h1>
//               <p style={styles.imageText}>
//                 Secure access to your dashboard and orders.
//               </p>
//             </div>
//           </div>
//         )}

//         <div style={styles.formSection}>
//           <div style={styles.card}>
//             <h2 style={styles.title}>
//               {mode === "login" ? "Sign In" : "Create Account"}
//             </h2>

//             <form onSubmit={submit} style={styles.form}>
//               {mode === "register" && (
//                 <div style={styles.row}>
//                   <input
//                     style={styles.input}
//                     name="firstName"
//                     placeholder="First Name"
//                     onChange={change}
//                     required
//                   />
//                   <input
//                     style={styles.input}
//                     name="lastName"
//                     placeholder="Last Name"
//                     onChange={change}
//                     required
//                   />
//                 </div>
//               )}

//               <input
//                 style={styles.input}
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 autoComplete="email"
//                 onChange={change}
//                 required
//               />

//               <div style={styles.passwordWrapper}>
//                 <span
//                   style={styles.eyeIcon}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </span>

//                 <input
//                   style={styles.passwordInput}
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   autoComplete="new-password"
//                   onChange={change}
//                   required
//                 />
//               </div>

//               {error && (
//                 <div style={styles.error}>{error}</div>
//               )}

//               <button
//                 type="submit"
//                 style={styles.button}
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : mode === "login"
//                   ? "Sign In"
//                   : "Sign Up"}
//               </button>
//             </form>

//             <button
//               style={styles.toggle}
//               onClick={() =>
//                 setMode(
//                   mode === "login" ? "register" : "login"
//                 )
//               }
//             >
//               {mode === "login"
//                 ? "New here? Create an account"
//                 : "Already have an account? Log in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// /* ---------------- ICONS ---------------- */
// const Eye = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path
//       d="M1 12C3.5 7 7.5 4 12 4s8.5 3 11 8c-2.5 5-6.5 8-11 8s-8.5-3-11-8z"
//       stroke="#666"
//       strokeWidth="2"
//     />
//     <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2" />
//   </svg>
// );

// const EyeOff = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <path d="M3 3l18 18" stroke="#666" strokeWidth="2" />
//     <path
//       d="M10.7 10.7A3 3 0 0012 15a3 3 0 002.3-4.3"
//       stroke="#666"
//       strokeWidth="2"
//     />
//   </svg>
// );

// /* ---------------- STYLES ---------------- */
// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#f5f7fb",
//   },

//   topBar: {
//     padding: "16px 24px",
//     background: "#fff",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//   },

//   backButton: {
//     background: "linear-gradient(135deg,#1877f2,#42a5f5)",
//     border: "none",
//     color: "#fff",
//     padding: "10px 18px",
//     borderRadius: "999px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },

//   container: {
//     display: "flex",
//     minHeight: "calc(100vh - 64px)",
//   },

//   imageSection: {
//     flex: 1,
//     backgroundImage:
//       "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80)",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     alignItems: "center",
//   },

//   overlay: {
//     background: "rgba(0,0,0,0.55)",
//     padding: "60px",
//     color: "#fff",
//     width: "100%",
//   },

//   imageTitle: {
//     fontSize: "38px",
//     fontWeight: "800",
//     marginBottom: "10px",
//   },

//   imageText: {
//     fontSize: "16px",
//     maxWidth: "360px",
//   },

//   formSection: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "24px",
//   },

//   card: {
//     width: "100%",
//     maxWidth: "420px",
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "14px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//   },

//   title: {
//     fontSize: "26px",
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: "24px",
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//   },

//   row: {
//     display: "flex",
//     gap: "10px",
//   },

//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     fontSize: "15px",
//     width: "100%",
//   },

//   passwordWrapper: {
//     position: "relative",
//   },

//   eyeIcon: {
//     position: "absolute",
//     left: "12px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     cursor: "pointer",
//   },

//   passwordInput: {
//     padding: "12px 12px 12px 42px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     width: "100%",
//   },

//   button: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#1877f2",
//     color: "#fff",
//     fontWeight: "600",
//     cursor: "pointer",
//   },

//   error: {
//     color: "#d32f2f",
//     textAlign: "center",
//     fontSize: "13px",
//   },

//   toggle: {
//     marginTop: "16px",
//     background: "none",
//     border: "none",
//     color: "#1877f2",
//     cursor: "pointer",
//     width: "100%",
//   },
// };

// ------------------  After Brevo --------------------------------
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const abortRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ---------- RESPONSIVE ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------- SUBMIT ---------- */
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let endpoint = "/auth/login";
      let payload = {};

      if (mode === "register") {
        endpoint = "/auth/signup";
        payload = form;
      } else if (mode === "forgot") {
        endpoint = "/auth/forgot-password";
        payload = { email: form.email };
      } else {
        payload = { email: form.email, password: form.password };
      }

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error();

      // ---------- FLOWS ----------
      if (mode === "register") {
        alert("Account created successfully. Please login.");
        setMode("login");
        return;
      }

      if (mode === "forgot") {
        setMessage(
          "If you have an account, a password reset email has been sent."
        );
        return;
      }

      const data = await res.json();

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
    } catch {
      if (mode === "forgot") {
        setMessage(
          "If you have an account, a password reset email has been sent."
        );
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <div
        style={{
          ...styles.container,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {!isMobile && (
          <div style={styles.imageSection}>
            <div style={styles.overlay}>
              <h1 style={styles.imageTitle}>Welcome Back</h1>
              <p style={styles.imageText}>
                Secure access to your dashboard and orders.
              </p>
            </div>
          </div>
        )}

        <div style={styles.formSection}>
          <div style={styles.card}>
            <h2 style={styles.title}>
              {mode === "login"
                ? "Sign In"
                : mode === "register"
                ? "Create Account"
                : "Forgot Password"}
            </h2>

            <form onSubmit={submit} style={styles.form}>
              {mode === "register" && (
                <div style={styles.row}>
                  <input
                    style={styles.input}
                    name="firstName"
                    placeholder="First Name"
                    onChange={change}
                    required
                  />
                  <input
                    style={styles.input}
                    name="lastName"
                    placeholder="Last Name"
                    onChange={change}
                    required
                  />
                </div>
              )}

              <input
                style={styles.input}
                name="email"
                type="email"
                placeholder="Email"
                onChange={change}
                required
              />

              {mode !== "forgot" && (
                <div style={styles.passwordWrapper}>
                  <span
                    style={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>

                  <input
                    style={styles.passwordInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={change}
                    required
                  />
                </div>
              )}

              {error && <div style={styles.error}>{error}</div>}
              {message && <div style={styles.success}>{message}</div>}

              <button type="submit" style={styles.button} disabled={loading}>
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Sign In"
                  : mode === "register"
                  ? "Sign Up"
                  : "Send Reset Email"}
              </button>
            </form>

            {mode === "login" && (
              <button
                style={styles.forgot}
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </button>
            )}

            <button
              style={styles.toggle}
              onClick={() =>
                setMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
            >
              {mode === "login"
                ? "New here? Create an account"
                : "Back to login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- ICONS ---------- */
const Eye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2" />
  </svg>
);

const EyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 3l18 18" stroke="#666" strokeWidth="2" />
  </svg>
);

/* ---------- STYLES ---------- */
const styles = {
  page: { minHeight: "100vh", background: "#f5f7fb" },
  topBar: { padding: "16px 24px", background: "#fff" },
  backButton: { border: "none", background: "#1877f2", color: "#fff", padding: "10px 18px", borderRadius: "999px" },
  container: { display: "flex", minHeight: "calc(100vh - 64px)" },
  imageSection: { flex: 1, backgroundSize: "cover", display: "flex", alignItems: "center" },
  overlay: { background: "rgba(0,0,0,0.55)", padding: "60px", color: "#fff" },
  imageTitle: { fontSize: "38px", fontWeight: "800" },
  imageText: { fontSize: "16px" },
  formSection: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" },
  card: { width: "100%", maxWidth: "420px", background: "#fff", padding: "40px", borderRadius: "14px" },
  title: { fontSize: "26px", fontWeight: "700", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  row: { display: "flex", gap: "10px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ddd" },
  passwordWrapper: { position: "relative" },
  eyeIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" },
  passwordInput: { padding: "12px 12px 12px 42px", borderRadius: "8px", border: "1px solid #ddd" },
  button: { padding: "12px", borderRadius: "8px", border: "none", background: "#1877f2", color: "#fff" },
  error: { color: "#d32f2f", textAlign: "center", fontSize: "13px" },
  success: { color: "#2e7d32", textAlign: "center", fontSize: "13px" },
  forgot: { background: "none", border: "none", color: "#1877f2", cursor: "pointer" },
  toggle: { background: "none", border: "none", color: "#1877f2", cursor: "pointer" },
};
