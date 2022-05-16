<script>
    import { onMount } from "svelte";
    import Trashcan from "svelte-material-icons/DeleteForever.svelte";

    let price;
    let cost;
    let title;
    let products = [];

    const addProduct = async () => {
        const res = await fetch("http://localhost:3000/products", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                title,
                price,
                cost,
            }),
            credentials: "include",
        });
        const data = await res.json();
        products = [...data];
        price = "";
        cost = "";
        title = "";
    };

    const deleteProduct = async (product) => {
        const res = await fetch("http://localhost:3000/products", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({
                id: product._id,
            }),
            credentials: "include",
        });
        const data = await res.json();
        products = [...data];
    };

    onMount(async () => {
        const res = await fetch("http://localhost:3000/products", {
            credentials: "include",
        });
        products = await res.json();
    });
</script>

<div class="container">
    <ul class="product-list">
        <div class="headlines">
            <li>Title</li>
            <li>Price</li>
            <li>Cost</li>
            <li>Delete</li>
        </div>
        <hr />
        {#each products as product}
            <div class="product">
                <li class="title ">{product.title}</li>
                <li class="price">{product.price}</li>
                <li class="cost">{product.cost}</li>
                <li
                    on:click={() => {
                        deleteProduct(product);
                    }}
                >
                    <Trashcan />
                </li>
            </div>
        {/each}
    </ul>

    <div class="product-input-container">
        <input
            type="text"
            bind:value={title}
            class="input-class"
            required
            placeholder="Title"
        />
        <input
            type="number"
            bind:value={price}
            class="input-price"
            required
            placeholder="Price"
        />
        <input
            type="number"
            bind:value={cost}
            class="input-cost"
            required
            placeholder="Cost"
        />
        <button
            class=""
            on:click={() => {
                addProduct();
            }}>Add product</button
        >
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    li {
        width: 100px;
    }
    .headlines {
        display: flex;
        flex-direction: row;
    }
    .product {
        display: flex;
    }
</style>
