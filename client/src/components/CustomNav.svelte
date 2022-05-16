<script>
    import { Link } from "svelte-navigator";
    import { toasts } from "svelte-toasts";
    import { user } from "../stores/stores";

    export function logout() {
        user.set(null);
    }
</script>

<nav class="nav-bar">
    <ul class="nav-links">
        <li class="nav-item">
            <Link to="/" class="nav-anchors">CEO Dashboard</Link>
        </li>

        <!-- {#if $user && $user.role === "Admin"} -->
            <li class="nav-item">
                <Link to="/users" class="nav-anchors">User management</Link>
            </li>
        <!-- {/if} -->

        <li class="nav-item">
            <Link
                to="/"
                class="nav-anchors"
                on:click={() => {
                    logout();
                    toasts.warning("youre now logged out");
                }}>Log out</Link
            >
        </li>

        <li class="nav-item">
            <Link to="/products" class="nav-anchors">Products</Link>
        </li>
        <li class="nav-item">
            <Link to="/orders" class="nav-anchors">Orders</Link>
        </li>
    </ul>
</nav>

<style>
    .nav-bar {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: coral;
        min-width: 15vw;

        align-items: center;
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
        background-color: lightcoral;
    }
</style>
