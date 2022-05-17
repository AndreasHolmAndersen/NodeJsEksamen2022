<script>
  import { dataFromPeriods } from "../stores/stores";

  export let periodOneStartDate;
  export let periodOneEndDate;
  export let periodTwoStartDate;
  export let periodTwoEndDate;
  export let data;

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
    data = await res.json();
    dataFromPeriods.set(data);
  };
</script>

<button
  on:click={() => {
    getDataFromPeriod();
  }}>sort by period</button
>
