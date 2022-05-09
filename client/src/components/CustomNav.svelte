<script>
    import { Link } from "svelte-navigator";
    import { toasts } from "svelte-toasts";

    export function logout() {
        user.set(null);
    }
</script>
<nav class="nav-bar">
    <ul class="nav-links">
        <li class="nav-item">
            <Link to="/" class="nav-anchors">CEO Dashboard</Link>
        </li>
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
            <Link to="/sign-up" class="nav-anchors"
                >Create new user</Link
            >
        </li>
    </ul>
</nav>

<style>
    :global(a) {
        color: white !important;
        text-decoration: none !important;
        height: 100%;
    }
    .nav-bar {
        display: flex;
        width: 100vw;
        height: 100px;
        background-color: #233249;
    }
    .nav-links {
        display: flex;
        justify-content: center;
        width: 100vw;
        align-items: center;
    }

    .nav-item {
        display: flex;
        list-style: none;
        padding: 20px;
        color: #ffffff;
        text-decoration: none;
        font-size: 1.2em;
        text-transform: uppercase;
    }
    .nav-item:hover {
        background: #2b3e5a;
    }
</style>