<script>
    import { onMount } from "svelte";

    let products = [];
    let order = { products: [] };
    let orderId;

    const addOrder = async () => {
        const res = await fetch("http://localhost:3000/orders", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                order,
            }),
            credentials: "include",
        });
    };

    const deleteOrder = async () => {
        const res = await fetch("http://localhost:3000/orders", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({
                id: orderId,
            }),
            credentials: "include",
        });
        const data = await res.json();
        console.log(data);
    };

    onMount(async () => {
        const res = await fetch("http://localhost:3000/products", {
            credentials: "include",
        });
        const data = await res.json();
        products = [...data];
    });
</script>

<div class="container">
    <ul class="product-list">
        <div class="headlines">
            <li>Title</li>
            <li>Price</li>
            <li>Cost</li>
            <li>Amount</li>
        </div>
        <hr />
        {#each products as product}
            <div class="product">
                <li class="title ">{product.title}</li>
                <li class="price">{product.price}</li>
                <li class="cost">{product.cost}</li>
                <li class="input-number">
                    <input type="number" bind:value={product.amount} />
                </li>
                <li>
                    <button
                        on:click={() => {
                            order.products.push({ product });
                            console.log(order);
                        }}>Add to order</button
                    >
                </li>
            </div>
        {/each}
    </ul>

    <button
        on:click={() => {
            addOrder();
        }}>FINISH</button
    >

    <div>
        <input type="text" bind:value={orderId} placeholder="enter order id"/>
        <button
            on:click={() => {
                deleteOrder();
                orderId = "";
            }}>Delete order</button
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
