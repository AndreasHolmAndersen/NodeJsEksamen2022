<script>
  import { theme } from "../stores/stores.js";
  import { onMount } from "svelte";
  import Trashcan from "svelte-material-icons/DeleteForever.svelte";

  let username = "";
  let password = "";
  let role;
  let users = [];

  onMount(async () => {
    const res = await fetch("http://localhost:3000/users", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      users = [...data];
    }
  });

  const deleteUser = async (user) => {
    const res = await fetch("http://localhost:3000/auth/delete-user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: user._id,
      }),
      credentials: "include",
    });
    const data = await res.json();
    users = [...data];
  };

  const createUser = async () => {
    const res = await fetch("http://localhost:3000/auth/sign-up", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        role,
      }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      users = [...data];
      username = "";
      password = "";
    }
  };
</script>

<div class="container">
  <ul class="user-list">
    <div class="headlines">
      <li>Username</li>
      <li>Role</li>
      <li>Delete</li>
    </div>
    <hr />
    {#each users as user}
      <div class="user">
        <li class="username ">{user.username}</li>
        <li class="role">{user.role}</li>
        <li
          on:click={() => {
            deleteUser(user);
          }}
        >
          <Trashcan width="1.35em" height="1.35em" />
        </li>
      </div>
    {/each}
  </ul>

  <div class="sign-up-container">
    <p>Create User</p>
    <div class="form-group">
      <input
        style="outline-color: {$theme.color}"
        bind:value={username}
        type="text"
        class="form-control custom-input"
        placeholder="Username"
        required
      />
    </div>

    <div class="form-group">
      <input
        style="outline-color: {$theme.color}"
        bind:value={password}
        type="password"
        class="form-control custom-input"
        placeholder="Password"
        required
      />
    </div>

    <div class="form-group">
      <select
        class="custom-input form-control"
        bind:value={role}
        type="text"
        required
      >
        <option value="Standard">Standard</option>
        <option value="Admin">Admin</option>
      </select>
    </div>

    <button
      style="border-color: {$theme.color};"
      class="custom-button"
      on:click={() => {
        if (username !== "" && password !== "") {
          createUser();
        }
      }}>Sign up</button
    >
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
  }
  li {
    width: 100%;
    min-width: 130px;
    margin-top: 5px;
  }
  .headlines {
    display: flex;
    flex-direction: row;
  }
  .user-list {
    display: flex;
    flex-direction: column;
  }
  .user {
    display: flex;
  }
  .sign-up-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
  }
  .form-group {
    margin: 10px;
  }
</style>
