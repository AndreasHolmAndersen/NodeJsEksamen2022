<script>
  import { dataFromPeriods, periodsStore } from "../stores/stores";

  let revenuePeriodOne = 0;
  let revenuePeriodTwo = 0;
  let differenceInPercentage = 0;

  $: $dataFromPeriods, calculateRevenue($dataFromPeriods);

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
  };
</script>

{#if $dataFromPeriods.length > 0}
  <div>
    <div class="period-wrapper">
      <div class="period-one">
        <h3>
          {$periodsStore[0].year}
          {" - "}
          {$periodsStore[0].periodName}
        </h3>
        <div>
          {revenuePeriodOne}
        </div>
      </div>
      <div class="period-two">
        <h3>
          {$periodsStore[1].year}
          {" - "}
          {$periodsStore[1].periodName}
        </h3>
        <div class="">
          {revenuePeriodTwo}
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
    <div class="goal">goal:</div>
  </div>
{/if}
