<script>
    import { user } from "../stores/stores.js";
    import { toasts } from "svelte-toasts";
    import { useNavigate, useLocation } from "svelte-navigator";

    const navigate = useNavigate();

    let username = "";
    let password = "";

    async function handleSubmit(e) {
        let res = await fetch("http://localhost:3000/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: "include"
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.username) {
                user.set(data);
                toasts.success("logged in");
                navigate("/");
            }
            if (data.error) {
                toasts.error(data.error);
            }
        }
    }
</script>

<div class="login-container">
    <h1>Login page</h1>
    <div class="form-group">
        <input
            bind:value={username}
            type="text"
            class="form-control"
            placeholder="Username"
            required
        />
    </div>

    <div class="form-group">
        <input
            bind:value={password}
            type="text"
            class="form-control"
            placeholder="Password"
            required
        />
    </div>

    <button
        class="btn btn-full"
        on:click={() => {
            console.log(username, password);
            handleSubmit();
        }}>Login</button
    >
</div>

<style>
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    input {
        margin: 15px;
        height: 30px;
        text-indent: 10px;

        border: none;
        box-shadow: 1px 1px 1px #888888;
    }
    button {
        color: white;
        text-transform: uppercase;
        background-color: #233249;
        border-width: 0;
        height: 54px;
        text-align: center !important;
        padding: 0 1.25em;
        width: auto;
        box-shadow: 1px 1px 1px #888888;
    }
    button:hover {
        color: #fff;
        background-color: #233249;
        border-color: #233249;
    }
    h1 {
        text-transform: uppercase;
    }
</style>
