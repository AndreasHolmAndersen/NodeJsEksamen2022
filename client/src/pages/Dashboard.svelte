<script>
  import FixedPeriods from "../components/FixedPeriods.svelte";
  import ProfitWidget from "../components/ProfitWidget.svelte";
  import RevenueWidget from "../components/RevenueWidget.svelte";
  import ThemeWidget from "../components/ThemeWidget.svelte";
  import { goals, ordersFromPeriods, periodsStore } from "../stores/stores";
</script>

<div class="dashboard-wrapper">
  <div class="row">
    <FixedPeriods />
    <ThemeWidget />
  </div>
  <p>Think about revenue growth goals, and implementation of the widget</p>
  <div class="widgets">
    <RevenueWidget />

    <div class="profit-widgets">
      {#if $ordersFromPeriods.length > 0}
        <ProfitWidget
          ordersFromPeriod={$ordersFromPeriods[0]}
          goalsPassed={$goals[0]}
          period={$periodsStore[0]}
        />
        <ProfitWidget
          ordersFromPeriod={$ordersFromPeriods[1]}
          goalsPassed={$goals[1]}
          period={$periodsStore[1]}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .dashboard-wrapper {
    width: 100%;
  }
  .widgets {
    display: flex;
    flex-direction: row;
  }
  .profit-widgets {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
</style>
