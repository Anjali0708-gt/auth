import { useState } from 'react';
import api from "./api";
import './App.css';
import { Link } from "react-router";
import toast from 'react-hot-toast';
import { useAuthStore } from "./store/authstore";
import { AxiosError } from "axios";

type User = {
  name: string;
  email: string;
};

function LogIn() {
  // ✅ FIX: proper type instead of null
  const [data, setdata] = useState<User | null>(null);
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const setToken = useAuthStore((t) => t.settoken);
  const token = useAuthStore((t) => t.token);
  const logout = useAuthStore((t) => t.logout);

  // ✅ FIX: event type
  async function handledata(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Please enter your email");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter your password");
      return;
    }

    setloading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      setToken(res.data.token);
      toast.success("User login successfully");

      setdata(res.data.user);
      setemail("");
      setpassword("");

    } catch (err) {
      // ✅ FIX: unknown error type
      const e = err as AxiosError<{ msg: string }>;
      console.log("error while login", e.response?.data);

      toast.error(e.response?.data?.msg || "Login failed");

      setemail("");
      setpassword("");

    } finally {
      setloading(false);
    }
  }

  return (
    <div className="container">

      {!data && (
        <div className="card">
          <h1>User Login</h1>

          <form onSubmit={handledata}>

            <input
              type="email"
              value={email}
              placeholder="enter email"
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="enter password"
              onChange={(e) => setpassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "loading..." : "login"}
            </button>

            <Link to="/forget">forget password</Link>

          </form>
        </div>
      )}

      {data && (
        <div className="card welcome">
          <h1>🎉 Welcome!</h1>
          <h2>{data.name}</h2>
          <p>{data.email}</p>

          {token && <p className="token-box">Token: {token}</p>}

          <br />

          {/* ✅ FIX: setdata(null) instead of "" */}
          <button onClick={() => { logout(); setdata(null); }}>
            logout
          </button>
        </div>
      )}

    </div>
  );
}

export default LogIn;