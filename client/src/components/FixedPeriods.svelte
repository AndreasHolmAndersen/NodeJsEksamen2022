<script>
  import GetDataFromPeriod from "./GetDataFromPeriod.svelte";

  let periodOneStartYear;
  let periodOne = {
    periodOneStart: "01-01",
    periodOneEnd: "12-31",
  };

  let periodTwoStartYear;
  let periodTwo = {
    periodTwoStart: "01-01",
    periodTwoEnd: "12-31",
  };
</script>

<div class="fixed-periods">
  <div class="period">
    <div>
      <p>Year 1</p>
      <input type="number" bind:value={periodOneStartYear} />
      <select bind:value={periodOne} name="periodOne" id="periodOne">
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "12-31",
          }}>Whole Year</option
        >
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "03-31",
          }}>Q1</option
        >
        <option
          value={{
            periodOneStart: "04-01",
            periodOneEnd: "06-30",
          }}>Q2</option
        >
        <option
          value={{
            periodOneStart: "07-01",
            periodOneEnd: "09-30",
          }}>Q3</option
        >
        <option
          value={{
            periodOneStart: "10-01",
            periodOneEnd: "12-31",
          }}>Q4</option
        >
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "01-31",
          }}>January</option
        >
        <option
          value={{
            periodOneStart: "02-01",
            periodOneEnd: "02-28",
          }}>February</option
        >
        <option
          value={{
            periodOneStart: "03-01",
            periodOneEnd: "03-31",
          }}>March</option
        >
        <option
          value={{
            periodOneStart: "04-01",
            periodOneEnd: "04-30",
          }}>April</option
        >
        <option
          value={{
            periodOneStart: "05-01",
            periodOneEnd: "05-31",
          }}>May</option
        >
        <option
          value={{
            periodOneStart: "06-01",
            periodOneEnd: "06-30",
          }}>June</option
        >
        <option
          value={{
            periodOneStart: "07-01",
            periodOneEnd: "07-31",
          }}>July</option
        >
        <option
          value={{
            periodOneStart: "08-01",
            periodOneEnd: "08-31",
          }}>August</option
        >
        <option
          value={{
            periodOneStart: "09-01",
            periodOneEnd: "09-30",
          }}>September</option
        >
        <option
          value={{
            periodOneStart: "10-01",
            periodOneEnd: "10-31",
          }}>October</option
        >
        <option
          value={{
            periodOneStart: "11-01",
            periodOneEnd: "11-30",
          }}>November</option
        >
        <option
          value={{
            periodOneStart: "12-01",
            periodOneEnd: "12-31",
          }}>December</option
        >
      </select>
      <p>Year 2</p>
      <input type="number" bind:value={periodTwoStartYear} />
      <select bind:value={periodTwo} name="periodTwo" id="periodTwo">
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "12-31",
          }}>Whole Year</option
        >
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "03-31",
          }}>Q1</option
        >
        <option
          value={{
            periodTwoStart: "04-01",
            periodTwoEnd: "06-30",
          }}>Q2</option
        >
        <option
          value={{
            periodTwoStart: "07-01",
            periodTwoEnd: "09-30",
          }}>Q3</option
        >
        <option
          value={{
            periodTwoStart: "10-01",
            periodTwoEnd: "12-31",
          }}>Q4</option
        >
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "01-31",
          }}>January</option
        >
        <option
          value={{
            periodTwoStart: "02-01",
            periodTwoEnd: "02-28",
          }}>February</option
        >
        <option
          value={{
            periodTwoStart: "03-01",
            periodTwoEnd: "03-31",
          }}>March</option
        >
        <option
          value={{
            periodTwoStart: "04-01",
            periodTwoEnd: "04-30",
          }}>April</option
        >
        <option
          value={{
            periodTwoStart: "05-01",
            periodTwoEnd: "05-31",
          }}>May</option
        >
        <option
          value={{
            periodTwoStart: "06-01",
            periodTwoEnd: "06-30",
          }}>June</option
        >
        <option
          value={{
            periodTwoStart: "07-01",
            periodTwoEnd: "07-31",
          }}>July</option
        >
        <option
          value={{
            periodTwoStart: "08-01",
            periodTwoEnd: "08-31",
          }}>August</option
        >
        <option
          value={{
            periodTwoStart: "09-01",
            periodTwoEnd: "09-30",
          }}>September</option
        >
        <option
          value={{
            periodTwoStart: "10-01",
            periodTwoEnd: "10-31",
          }}>October</option
        >
        <option
          value={{
            periodTwoStart: "11-01",
            periodTwoEnd: "11-30",
          }}>November</option
        >
        <option
          value={{
            periodTwoStart: "12-01",
            periodTwoEnd: "12-31",
          }}>December</option
        >
      </select>
    </div>
  </div>

  <GetDataFromPeriod
    periodOneStartDate={`${periodOneStartYear}-${periodOne.periodOneStart}`}
    periodOneEndDate={`${periodOneStartYear}-${periodOne.periodOneEnd}`}
    periodTwoStartDate={`${periodTwoStartYear}-${periodTwo.periodTwoStart}`}
    periodTwoEndDate={`${periodTwoStartYear}-${periodTwo.periodTwoEnd}`}
  />
</div>

<style>
</style>
