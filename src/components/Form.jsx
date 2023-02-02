import React from "react";
import styles from "./Form.module.css";
import validate from "./validate";

export default function Form(props) {
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({ username: "", password: "" });
  function handleInputChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        // si entra a ese if del validate -> {username: "El username no debe estar vacío"}
        ...userData,
        [e.target.name]: e.target.value,
      })
    ); // errors => {username: "El username no debe estar vacío"}
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.login(userData);
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.container}>
          <div className={styles.form_group}>
            <label>Username</label>
            <input
              className={errors.username && styles.warning}
              type="text"
              name="username"
              placerholder="Enter username"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <p className={styles.danger}>{errors.username}</p>
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input
              type="text"
              name="password"
              placerholder="Enter password"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <p className={styles.danger}>{errors.password}</p>
          </div>
          {/* {Object.keys(errors).length === 0 ? <button type="submit">Log In</button> :null} */}
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}


