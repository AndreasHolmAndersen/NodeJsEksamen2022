<script>
  import CustomPeriods from "../components/CustomPeriods.svelte";

  import FixedPeriods from "../components/FixedPeriods.svelte";
  import RevenueWidget from "../components/RevenueWidget.svelte";
</script>

<div class="dashboard-wrapper">
  <div class="">
    <!-- <CustomPeriods /> -->
    <FixedPeriods />
  </div>

  <div>
    <RevenueWidget />
  </div>

</div>
