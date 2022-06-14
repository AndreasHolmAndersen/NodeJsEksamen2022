<script>
  import { onMount } from "svelte";
  import Trashcan from "svelte-material-icons/DeleteForever.svelte";
  import { theme } from "../stores/stores";

  let price = null;
  let cost = null;
  let title = "";
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
    price = null;
    cost = null;
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
          <Trashcan width="1.35em" height="1.35em" />
        </li>
      </div>
    {/each}
  </ul>

  <div class="product-input-container">
    <input
      style="outline-color: {$theme.color}"
      type="text"
      bind:value={title}
      class="input custom-input"
      required
      placeholder="Title"
    />
    <input
      style="outline-color: {$theme.color}"
      type="number"
      bind:value={price}
      class="input custom-input"
      required
      placeholder="Price"
    />
    <input
      style="outline-color: {$theme.color}"
      type="number"
      bind:value={cost}
      class="input custom-input"
      required
      placeholder="Cost"
    />
    <button
      style="border-color: {$theme.color};"
      class="custom-button"
      on:click={() => {
        if(price !== null && cost !== null && title !== ""){
        addProduct();
      }
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
  .product-input-container {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
  .input {
    margin-bottom: 10px;
  }
</style>
