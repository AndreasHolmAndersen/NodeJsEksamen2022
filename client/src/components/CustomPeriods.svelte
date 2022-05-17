<script>
  import GetDataFromPeriod from "./GetDataFromPeriod.svelte";

  let periodOneStartDate;
  let periodOneEndDate;
  let periodTwoStartDate;
  let periodTwoEndDate;
</script>

<div class="custom-periods">
  <div class="custom-period-1">
    <p>Custom Period 1</p>
    <input type="date" name="period-1" bind:value={periodOneStartDate} />
    <input type="date" name="period-1" bind:value={periodOneEndDate} />
  </div>
  <div class="custom-period-2">
    <p>Custom Period 2</p>
    <input type="date" name="period-2" bind:value={periodTwoStartDate} />
    <input type="date" name="period-2" bind:value={periodTwoEndDate} />
  </div>
  <GetDataFromPeriod
    {periodOneStartDate}
    {periodOneEndDate}
    {periodTwoStartDate}
    {periodTwoEndDate}
  />
</div>
