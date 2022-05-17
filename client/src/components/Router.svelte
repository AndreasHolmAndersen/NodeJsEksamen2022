<script>
  import { Router, Link, Route } from "svelte-navigator";

  import Login from "../pages/Login.svelte";
  import Users from "../pages/Users.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import CustomNav from "./CustomNav.svelte";
  import Products from "../pages/Products.svelte";
  import Orders from "../pages/Orders.svelte";
  import Dashboard from "../pages/Dashboard.svelte";
</script>

<Router primary={false}>
  <!-- {#if $user} -->
  <CustomNav />
  <!-- {/if} -->

  <Route path="/" component={Dashboard} />
  <Route path="/login" component={Login} />
  <Route path="/users" component={Users} />
  <Route path="/products" component={Products} />
  <Route path="/orders" component={Orders} />

  <!-- <PrivateRoute path="/" let:location />

    
    <PrivateRoute path="/users" let:location>
        <Users />
    </PrivateRoute> -->
</Router>
