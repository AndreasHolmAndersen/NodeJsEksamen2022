<script>
  import { onMount } from "svelte";
  import { theme } from "../stores/stores";

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

    const data = await res.json();
    orderId = data.insertedId;
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
  };

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products", {
      credentials: "include",
    });
    const data = await res.json();
    products = [...data];
  };

  onMount(fetchProducts);
</script>

<div class="container">
  <ul class="product-list">
    <div class="headlines">
      <li>Title</li>
      <li>Price</li>
      <li>Cost</li>
      <li>Amount</li>
      <li />
    </div>
    <hr />
    {#each products as product}
      <div class="product">
        <li class="title ">{product.title}</li>
        <li class="price">{product.price}</li>
        <li class="cost">{product.cost}</li>
        <li class="input-number">
          <input
            class="custom-input"
            type="number"
            bind:value={product.amount}
            style="width: 100%; outline-color: {$theme.color}"
          />
        </li>
        <li>
          <button
            class="custom-button"
            style="border-color: {$theme.color};"
            on:click={() => {
              order.products.push({ product });
              order = order;
            }}>+</button
          >
        </li>
      </div>
    {/each}
  </ul>

  <div class="finish">
    <button
      style="border-color: {$theme.color};"
      class="custom-button"
      on:click={() => {
        addOrder();
        fetchProducts();
      }}>FINISH</button
    >
  </div>

  <div class="delete-order">
    <input
      style="outline-color: {$theme.color}"
      class="custom-input delete-input"
      type="text"
      bind:value={orderId}
      placeholder="enter order id"
    />
    <button
      style="border-color: {$theme.color}"
      class="custom-button"
      on:click={() => {
        deleteOrder();
        orderId = "";
        order = { products: [] };
        fetchProducts();
      }}>Delete order</button
    >
  </div>

  <div class="newest-order-created">
    <h2>Current order</h2>
    <p>id:{orderId ? orderId : "order not created"}</p>
    <ul>
      <div class="headlines">
        <li>Title</li>
        <li>Amount</li>
        <li>Price</li>
        <li>Total</li>
      </div>
      <hr />
      {#each order.products as product}
        <div class="product">
          <li>{product.product.title}</li>
          <li>{product.product.amount}</li>
          <li>{product.product.price} DKK</li>
          <li>{Number(product.product.price * product.product.amount)} DKK</li>
        </div>
      {/each}
    </ul>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
  }
  li {
    width: 100%;
    min-width: 130px;
    margin-top: 5px;
  }
  .headlines {
    display: flex;
    flex-direction: row;
  }
  .product {
    display: flex;
  }
  .newest-order-created {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .finish {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .delete-order {
    display: flex;
  }
  .delete-input {
    margin-right: 10px;
  }
  button:hover {
    background-color: var(--hoverColor);
  }
</style>
