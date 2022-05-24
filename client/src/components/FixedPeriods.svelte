<script>
  import { goals, ordersFromPeriods, periodsStore } from "../stores/stores";

  let periodOneYear = "2020";
  let periodOne = {
    periodOneStart: "01-01",
    periodOneEnd: "12-31",
    periodName: "year",
  };

  let periodTwoYear = "2021";
  let periodTwo = {
    periodTwoStart: "01-01",
    periodTwoEnd: "12-31",
    periodName: "year",
  };

  const getOrdersFromPeriod = async () => {
    const res = await fetch("http://localhost:3000/orders/period", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        periodOneStartDate: `${periodOneYear}-${periodOne.periodOneStart}`,
        periodOneEndDate: `${periodOneYear}-${periodOne.periodOneEnd}`,
        periodTwoStartDate: `${periodTwoYear}-${periodTwo.periodTwoStart}`,
        periodTwoEndDate: `${periodTwoYear}-${periodTwo.periodTwoEnd}`,
      }),
      credentials: "include",
    });
    ordersFromPeriods.set(await res.json());
  };

  const getGoals = async () => {
    const res = await fetch("http://localhost:3000/goals/periods", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        periodOneYear,
        periodOneName: periodOne.periodName,
        periodTwoYear,
        periodTwoName: periodTwo.periodName,
      }),
      credentials: "include",
    });
    goals.set(await res.json());
  };
</script>

<div class="fixed-periods">
  <div class="period">
    <div>
      <p>Year 1</p>
      <input type="number" bind:value={periodOneYear} />
      <select bind:value={periodOne} name="periodOne" id="periodOne">
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "12-31",
            periodName: "year",
          }}>Whole Year</option
        >
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "03-31",
            periodName: "Q1",
          }}>Q1</option
        >
        <option
          value={{
            periodOneStart: "04-01",
            periodOneEnd: "06-30",
            periodName: "Q2",
          }}>Q2</option
        >
        <option
          value={{
            periodOneStart: "07-01",
            periodOneEnd: "09-30",
            periodName: "Q3",
          }}>Q3</option
        >
        <option
          value={{
            periodOneStart: "10-01",
            periodOneEnd: "12-31",
            periodName: "Q4",
          }}>Q4</option
        >
        <option
          value={{
            periodOneStart: "01-01",
            periodOneEnd: "01-31",
            periodName: "Jan",
          }}>January</option
        >
        <option
          value={{
            periodOneStart: "02-01",
            periodOneEnd: "02-28",
            periodName: "Feb",
          }}>February</option
        >
        <option
          value={{
            periodOneStart: "03-01",
            periodOneEnd: "03-31",
            periodName: "Mar",
          }}>March</option
        >
        <option
          value={{
            periodOneStart: "04-01",
            periodOneEnd: "04-30",
            periodName: "Apr",
          }}>April</option
        >
        <option
          value={{
            periodOneStart: "05-01",
            periodOneEnd: "05-31",
            periodName: "May",
          }}>May</option
        >
        <option
          value={{
            periodOneStart: "06-01",
            periodOneEnd: "06-30",
            periodName: "Jun",
          }}>June</option
        >
        <option
          value={{
            periodOneStart: "07-01",
            periodOneEnd: "07-31",
            periodName: "Jul",
          }}>July</option
        >
        <option
          value={{
            periodOneStart: "08-01",
            periodOneEnd: "08-31",
            periodName: "Aug",
          }}>August</option
        >
        <option
          value={{
            periodOneStart: "09-01",
            periodOneEnd: "09-30",
            periodName: "Sep",
          }}>September</option
        >
        <option
          value={{
            periodOneStart: "10-01",
            periodOneEnd: "10-31",
            periodName: "Oct",
          }}>October</option
        >
        <option
          value={{
            periodOneStart: "11-01",
            periodOneEnd: "11-30",
            periodName: "Nov",
          }}>November</option
        >
        <option
          value={{
            periodOneStart: "12-01",
            periodOneEnd: "12-31",
            periodName: "Dec",
          }}>December</option
        >
      </select>
      <p>Year 2</p>
      <input type="number" bind:value={periodTwoYear} />
      <select bind:value={periodTwo} name="periodTwo" id="periodTwo">
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "12-31",
            periodName: "year",
          }}>Whole Year</option
        >
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "03-31",
            periodName: "Q1",
          }}>Q1</option
        >
        <option
          value={{
            periodTwoStart: "04-01",
            periodTwoEnd: "06-30",
            periodName: "Q2",
          }}>Q2</option
        >
        <option
          value={{
            periodTwoStart: "07-01",
            periodTwoEnd: "09-30",
            periodName: "Q3",
          }}>Q3</option
        >
        <option
          value={{
            periodTwoStart: "10-01",
            periodTwoEnd: "12-31",
            periodName: "Q4",
          }}>Q4</option
        >
        <option
          value={{
            periodTwoStart: "01-01",
            periodTwoEnd: "01-31",
            periodName: "Jan",
          }}>January</option
        >
        <option
          value={{
            periodTwoStart: "02-01",
            periodTwoEnd: "02-28",
            periodName: "Feb",
          }}>February</option
        >
        <option
          value={{
            periodTwoStart: "03-01",
            periodTwoEnd: "03-31",
            periodName: "Mar",
          }}>March</option
        >
        <option
          value={{
            periodTwoStart: "04-01",
            periodTwoEnd: "04-30",
            periodName: "Apr",
          }}>April</option
        >
        <option
          value={{
            periodTwoStart: "05-01",
            periodTwoEnd: "05-31",
            periodName: "May",
          }}>May</option
        >
        <option
          value={{
            periodTwoStart: "06-01",
            periodTwoEnd: "06-30",
            periodName: "Jun",
          }}>June</option
        >
        <option
          value={{
            periodTwoStart: "07-01",
            periodTwoEnd: "07-31",
            periodName: "Jul",
          }}>July</option
        >
        <option
          value={{
            periodTwoStart: "08-01",
            periodTwoEnd: "08-31",
            periodName: "Aug",
          }}>August</option
        >
        <option
          value={{
            periodTwoStart: "09-01",
            periodTwoEnd: "09-30",
            periodName: "Sep",
          }}>September</option
        >
        <option
          value={{
            periodTwoStart: "10-01",
            periodTwoEnd: "10-31",
            periodName: "Oct",
          }}>October</option
        >
        <option
          value={{
            periodTwoStart: "11-01",
            periodTwoEnd: "11-30",
            periodName: "Nov",
          }}>November</option
        >
        <option
          value={{
            periodTwoStart: "12-01",
            periodTwoEnd: "12-31",
            periodName: "Dec",
          }}>December</option
        >
      </select>
    </div>
  </div>

  <button
    on:click={() => {
      getOrdersFromPeriod();
      periodsStore.set([
        { ...periodOne, year: periodOneYear },
        { ...periodTwo, year: periodTwoYear },
      ]);
      getGoals();
    }}>sort by period</button
  >
</div>

<style>
</style>
