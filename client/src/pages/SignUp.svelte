<script>
    import { user } from "../stores/stores.js";
    import { toasts } from "svelte-toasts";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    let username = "";
    let password = "";
    let role = "";

    async function handleSubmit(e) {
        let res = await fetch("http://localhost:3000/auth/sign-up", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                role
            }),
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.username) {
                user.set(data);
                toasts.success("user created");
                navigate("/");
            }
            if (data.error) {
                toasts.error(data.error);
            }
        }
    }
</script>

<div class="sign-up-container">
    <h1>Sign up</h1>
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

    <div class="form-group">
        <select
            bind:value={role}
            type="text"
            class="form-control"
            required
        >
            <option value="Standard">Standard</option>
            <option value="Admin">Admin</option>
        </select>
    </div>

    <button
        class="btn btn-full"
        on:click={() => {
            
            handleSubmit();
        }}>Sign up</button
    >
</div>
