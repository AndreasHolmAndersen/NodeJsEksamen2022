<script>
  import { theme, user } from "../stores/stores.js";
  import { toasts } from "svelte-toasts";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { onMount } from "svelte";

  const navigate = useNavigate();
  const location = useLocation();

  let username = "Admin";
  let password = "password";

  async function handleSubmit() {
    const res = await fetch("http://localhost:3000/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();

      if (data.username) {
        user.set(data);
        toasts.success("logged in");
        navigate("/", {
          state: { from: $location.pathname },
          replace: true,
        });
      }
      if (data.error) {
        toasts.error(data.error);
      }
    }
  }
</script>

<div class="login-container">
  <h1 class="title">CEO-Dashboard</h1>
  <h3 class="login">Login</h3>
  <div class="form-group">
    <input
      style="outline-color: {$theme.color}"
      bind:value={username}
      type="text"
      class="custom-input"
      placeholder="Username"
      required
    />
  </div>

  <div class="form-group">
    <input
      style="outline-color: {$theme.color}"
      bind:value={password}
      type="password"
      class="custom-input"
      placeholder="Password"
      required
    />
  </div>

  <div>
    <button
      style="border-color: {$theme.color};"
      class="custom-button"
      on:click={() => {
        handleSubmit();
      }}>Login</button
    >
  </div>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  input {
    margin-bottom: 10px;
  }
  .login {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .title {
    position: relative;
    top: -200px;
  }
</style>
