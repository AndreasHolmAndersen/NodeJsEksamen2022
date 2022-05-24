<!-- <script>
  import { ordersFromPeriods, periodsStore} from "../stores/stores";
  
  export let periodOneStartDate;
  export let periodOneEndDate;
  export let periodTwoStartDate;
  export let periodTwoEndDate;
  export let periods = [];
  

  const getDataFromPeriod = async () => {
    const res = await fetch("http://localhost:3000/orders/period", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        periodOneStartDate,
        periodOneEndDate,
        periodTwoStartDate,
        periodTwoEndDate,
      }),
      credentials: "include",
    });
    ordersFromPeriods.set(await res.json());
  };
</script>

<button
  on:click={() => {
    getDataFromPeriod();
    periodsStore.set(periods)
  }}>sort by period</button
> -->
