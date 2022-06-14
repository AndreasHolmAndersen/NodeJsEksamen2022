<script>
  import { Link } from "svelte-navigator";
  import { theme, user } from "../stores/stores";

  export function logout() {
    user.set(null);
  }
</script>

<nav class="nav-bar" style="background-color: {$theme.color}">
  <ul class="nav-links">
    <li class="nav-item">
      <Link to="/" class="nav-anchors">CEO Dashboard</Link>
    </li>

    {#if $user && $user.role === "Admin"}
      <li class="nav-item">
        <Link to="/users" class="nav-anchors">User management</Link>
      </li>
      <li class="nav-item">
        <Link to="/products" class="nav-anchors">Products</Link>
      </li>
      <li class="nav-item">
        <Link to="/orders" class="nav-anchors">Orders</Link>
      </li>
      <li class="nav-item">
        <Link to="/goals" class="nav-anchors">Goals</Link>
      </li>
    {/if}

    <li class="nav-item">
      <Link
        to="/"
        class="nav-anchors"
        on:click={() => {
          logout();
        }}>Log out</Link
      >
    </li>
  </ul>
</nav>

<style>
  .nav-bar {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 15vw;
    align-items: center;
    background-color: gray;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .nav-item {
    padding-top: 10px;
    font-size: 16px;
    padding-left: 10px;
  }
  .nav-item:hover {
    opacity: 80%;
    margin-left: 10px;
  }
</style>
