import { useState } from "react";
import toast from "react-hot-toast";

const backendUri = "https://cg6gxs-5000.csb.app";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`${backendUri}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.Error);
      }

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}
