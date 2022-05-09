<script>
    import { Router, Link, Route } from "svelte-navigator";
   
    import { user } from "../stores/stores.js";
    import Login from "../pages/Login.svelte";
    import SignUp from "../pages/SignUp.svelte";
    import PrivateRoute from "./PrivateRoute.svelte";
    import CustomNav from "./CustomNav.svelte";

    
</script>

<Router primary={false}>
    {#if $user}
        <CustomNav/>
    {/if}

    <Route path="/login" component={Login} />

    <PrivateRoute path="/" let:location />

    
    <PrivateRoute path="/sign-up" let:location>
        <SignUp />
    </PrivateRoute>
    
</Router>


