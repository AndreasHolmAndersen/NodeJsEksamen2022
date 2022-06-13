<script>
  import { goals, ordersFromPeriods, theme } from "../stores/stores";
  import PieChart from "./PieChart.svelte";

  export let ordersFromPeriod;
  export let goalsPassed;
  export let period = {};

  let profitPeriod;
  let revenuePeriod;
  let costPeriod;
  let profitGoal;
  let goalPercentage;

  let currencyFormatter = Intl.NumberFormat("da-DA", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  });

  $: $ordersFromPeriods, calculateProfit(ordersFromPeriod);

  const getProfitGoal = (goalsArray) => {
    goalPercentage = 0;
    profitGoal = null;

    let goal = undefined;

    if (goalsArray.length > 0) {
      goal = goalsArray.find((goal) => {
        return goal.goal === "profit";
      });
      if (goal !== undefined) {
        profitGoal = goal.goalValue;
      }
    }
    goalPercentage = Number((profitPeriod / profitGoal) * 100).toFixed(0);
  };

  const calculateProfit = (data) => {
    revenuePeriod = 0;
    costPeriod = 0;
    profitPeriod = 0;

    if (data.length > 0) {
      data.forEach((order) => {
        order.products.forEach((products) => {
          revenuePeriod += Number(
            products.product.amount * products.product.price
          );
          costPeriod += Number(products.product.amount * products.product.cost);
        });
      });
      profitPeriod = revenuePeriod - costPeriod;
    }

    getProfitGoal(goalsPassed);
  };
</script>

{#if $ordersFromPeriods.length > 0}
  <div class="profit-widget" style="border: 2px solid {$theme.color}">
    <h3 class="text-align">
      Profit - {period.year}
      {#if period.periodName !== "year"}
        {period.periodName}
      {/if}
    </h3>
    <div class="container">
      <div class="profit-container">
        <p>Profit</p>
        <p>{currencyFormatter.format(profitPeriod)}</p>
      </div>
      <div class="goals-container">
        {#if profitGoal !== null}
          <p class="goal-headline">Goal</p>
          <p class="text-align">
            {currencyFormatter.format(profitGoal)}
          </p>
        {:else}
          <p>No Goal Entered</p>
        {/if}
      </div>
      {#if profitGoal !== null}
        <div class="pie-chart">
          <PieChart size={50} percent={goalPercentage} />
          {#if goalPercentage >= 100}
            <span class="percentage positive">{goalPercentage}%</span>
          {:else}
            <span class="percentage negative">{goalPercentage}%</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .profit-widget {
    border-radius: 20px;
    padding: 15px;
  }
  .container {
    display: flex;
    flex-direction: row;
  }
  .profit-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
  }
  .goals-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
  }
  .positive {
    color: green;
  }
  .negative {
    color: red;
  }
  .pie-chart {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .text-align {
    text-align: center;
  }
  .percentage {
    margin-left: 10px;
  }
</style>
