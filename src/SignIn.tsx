import { useState } from 'react';
import api from './api';
import toast from 'react-hot-toast';
import './App.css';
import { AxiosError } from "axios";

type User = {
  name: string;
  email: string;
};

function SignIn() {
  // ✅ FIX: proper type
  const [data, setdata] = useState<User | null>(null);
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  // ✅ FIX: event type
  async function handledata(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter your name");
      return;
    }

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
      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password
      });

      toast.success("User registered");
      setdata(res.data.user);

      setemail("");
      setname("");
      setpassword("");

    } catch (err) {
      // ✅ FIX: unknown error type
      const e = err as AxiosError<{ msg: string }>;
      console.log("error while signin", e.response?.data || e.message);

      toast.error(e.response?.data?.msg || "Can't sign in");

    } finally {
      setloading(false);
    }
  }

  return (
    <div className="container">

      {!data && (
        <div className="card">
          <h1>User Registration</h1>

          <form onSubmit={handledata}>
            <input
              type="text"
              value={name}
              placeholder="enter name"
              onChange={(e) => setname(e.target.value)}
            />

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
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      )}

      {data && (
        <div className="card welcome">
          <h1>🎉 Welcome!</h1>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
        </div>
      )}

    </div>
  );
}

export default SignIn;