<script>
  import { Router, Route } from "svelte-navigator";
  import Login from "../pages/Login.svelte";
  import Users from "../pages/Users.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import CustomNav from "./CustomNav.svelte";
  import Products from "../pages/Products.svelte";
  import Orders from "../pages/Orders.svelte";
  import Dashboard from "../pages/Dashboard.svelte";
  import Goals from "../pages/Goals.svelte";
  import { user } from "../stores/stores";
</script>

<Router primary={false}>
  {#if $user}
    <CustomNav />
  {/if}

  <PrivateRoute path="/" let:location>
    <Dashboard />
  </PrivateRoute>
  <Route path="/login" component={Login} />
  <PrivateRoute path="/users" let:location>
    <Users />
  </PrivateRoute>
  <PrivateRoute path="/products" let:location>
    <Products />
  </PrivateRoute>
  <PrivateRoute path="/orders" let:location>
    <Orders />
  </PrivateRoute>
  <PrivateRoute path="/goals" let:location>
    <Goals />
  </PrivateRoute>

  <PrivateRoute path="/users" let:location>
    <Users />
  </PrivateRoute>
</Router>
