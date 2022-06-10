<script>
  import {
    goals,
    ordersFromPeriods,
    periodsStore,
    theme,
  } from "../stores/stores";
  import PieChart from "./PieChart.svelte";

  let revenuePeriodOne = 0;
  let revenuePeriodTwo = 0;
  let differenceInPercentage = 0;

  let revenueFormatter = Intl.NumberFormat("da-DA", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  });

  let revenueGoalOne;
  let revenueGoalTwo;

  let goalPercentageOne;
  let goalPercentageTwo;

  $: $ordersFromPeriods, calculateRevenue($ordersFromPeriods);

  const getRevenueGoal = (goals) => {
    revenueGoalOne = null;
    revenueGoalTwo = null;

    let goalOne = undefined;
    let goalTwo = undefined;
    if (goals.length > 0) {
      goalOne = goals[0].find((goal) => {
        return goal.goal === "revenue";
      });

      goalTwo = goals[1].find((goal) => {
        return goal.goal === "revenue";
      });
      if (goalOne !== undefined) {
        revenueGoalOne = goalOne.goalValue;
      }
      if (goalTwo !== undefined) {
        revenueGoalTwo = goalTwo.goalValue;
      }
    }

    goalPercentageOne = Number(
      (revenuePeriodOne / revenueGoalOne) * 100
    ).toFixed(0);

    goalPercentageTwo = Number(
      (revenuePeriodTwo / revenueGoalTwo) * 100
    ).toFixed(0);
  };

  const calculateRevenue = (data) => {
    revenuePeriodOne = 0;
    revenuePeriodTwo = 0;
    differenceInPercentage = 0;

    if (data.length > 0) {
      data[0].forEach((order) => {
        order.products.forEach((products) => {
          revenuePeriodOne += Number(
            products.product.amount * products.product.price
          );
        });
      });

      data[1].forEach((order) => {
        order.products.forEach((products) => {
          revenuePeriodTwo += Number(
            products.product.amount * products.product.price
          );
        });
      });
    }
    differenceInPercentage = Number(
      ((revenuePeriodTwo - revenuePeriodOne) / revenuePeriodOne) * 100
    ).toFixed(2);

    getRevenueGoal($goals);
  };
</script>

{#if $ordersFromPeriods.length > 0}
  <div class="container" style="border: 2px solid {$theme.color}">
    <h3 class="text-align headline">Revenue</h3>
    <div class="period-wrapper">
      <div class="period-one">
        <h3 class="text-align">
          {$periodsStore[0].year}
          {#if $periodsStore[0].periodName !== "year"}
            {$periodsStore[0].periodName}
          {/if}
        </h3>
        <div>
          {revenueFormatter.format(revenuePeriodOne)}
        </div>
      </div>
      <div class="period-two">
        <h3 class="text-align">
          {$periodsStore[1].year}
          {#if $periodsStore[1].periodName !== "year"}
            {$periodsStore[1].periodName}
          {/if}
        </h3>
        <div class="text-align">
          {revenueFormatter.format(revenuePeriodTwo)}
          {#if differenceInPercentage >= 0}
            <p class="positive">
              {differenceInPercentage}{" %"}
            </p>
          {:else}
            <p class="negative">
              {differenceInPercentage}{" %"}
            </p>
          {/if}
        </div>
      </div>
    </div>

    <div class="goal">
      <div>
        {#if revenueGoalOne !== null}
          <p class="goal-headline">Goal</p>
          <p class="text-align">{revenueFormatter.format(revenueGoalOne)}</p>
          <div class="pie-chart">
            <PieChart size={50} percent={goalPercentageOne} />
            {#if goalPercentageOne >= 100}
              <span class="percentage positive">{goalPercentageOne}%</span>
            {:else}
              <span class="percentage negative">{goalPercentageOne}%</span>
            {/if}
          </div>
        {:else}
          <p>No Goal Entered</p>
        {/if}
      </div>

      <div>
        {#if revenueGoalTwo !== null}
          <p class="goal-headline">Goal</p>
          <p class="text-align">{revenueFormatter.format(revenueGoalTwo)}</p>
          <div class="pie-chart">
            <PieChart size={50} percent={goalPercentageTwo} />
            {#if goalPercentageTwo >= 100}
              <span class="percentage positive">{goalPercentageTwo}%</span>
            {:else}
              <span class="percentage negative">{goalPercentageTwo}%</span>
            {/if}
          </div>
        {:else}
          <p>No Goal Entered</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .goal-headline {
    width: 100%;
    opacity: 0.7;
    text-align: center;
  }
  .period-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .container {
    min-width: 450px;
    border-radius: 20px;
    padding: 15px;
  }
  .text-align {
    text-align: center;
  }
  .goal {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
  .pie-chart {
    display: flex;
    align-items: center;
  }
  .positive {
    color: green;
  }
  .negative {
    color: red;
  }
  .headline {
    margin-bottom: 10px;
  }
  .percentage {
    margin-left: 10px;
  }
</style>
