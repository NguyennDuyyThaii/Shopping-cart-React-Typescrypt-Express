import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if(auth._id){
        navigate('/cart')
    }
  }, [auth._id, navigate])

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(user))
  }
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>{auth.registerStatus === 'pending' ? "Submitting" : "Register"}</button>

        {auth.registerStatus === 'rejected' ? (<p>{auth.registerError}</p>) : null}
      </StyledForm>
    </>
  );
};

export default Register;
