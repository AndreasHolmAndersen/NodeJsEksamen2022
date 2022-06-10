<script>
  import FixedPeriods from "../components/FixedPeriods.svelte";
  import ProfitWidget from "../components/ProfitWidget.svelte";
  import RevenueWidget from "../components/RevenueWidget.svelte";
  import ThemeWidget from "../components/ThemeWidget.svelte";
  import { goals, ordersFromPeriods, periodsStore } from "../stores/stores";
</script>

<div class="dashboard-wrapper">
  <div class="sort-section">
    <div class="themes">
      <ThemeWidget />
    </div>
    <div class="periods">
      <FixedPeriods />
    </div>
  </div>
  <div class="widgets">
    <div class="revenue-widget">
      <RevenueWidget />
    </div>
    <div class="profit-widgets">
      <div class="profit-widget">
        {#if $ordersFromPeriods.length > 0}
          <ProfitWidget
            ordersFromPeriod={$ordersFromPeriods[0]}
            goalsPassed={$goals[0]}
            period={$periodsStore[0]}
          />
        {/if}
      </div>

      <div class="profit-widget">
        {#if $ordersFromPeriods.length > 0}
          <ProfitWidget
            ordersFromPeriod={$ordersFromPeriods[1]}
            goalsPassed={$goals[1]}
            period={$periodsStore[1]}
          />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard-wrapper {
    width: 100%;
  }
  .widgets {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
  }
  .profit-widgets {
    display: flex;
    flex-direction: row;
  }
  .profit-widget {
    margin: 15px;
  }
  .sort-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .themes {
    align-self: flex-end;
    margin: 10px;
  }
  .revenue-widget {
    margin: 15px;
  }
  .periods {
    margin-top: 20px;
  }
</style>
