<script>
  import CustomPeriods from "../components/CustomPeriods.svelte";
  import FixedPeriods from "../components/FixedPeriods.svelte";
  import { dataFromPeriods } from "../stores/stores";
</script>

<CustomPeriods />

<FixedPeriods />
{#if $dataFromPeriods[0] !== undefined}
  <p>{console.log($dataFromPeriods)}</p>
{/if}
