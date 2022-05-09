<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../stores/stores.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
	$: if ($user && $user.role !== "Admin") {
		navigate("/", {
			state: { from: "/sign-up" },
			replace: true,
		});
	}
</script>

{#if $user}
	<slot />
{/if}