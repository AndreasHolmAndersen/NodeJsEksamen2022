<script>
  import { theme } from "../stores/stores";
  import Trashcan from "svelte-material-icons/DeleteForever.svelte";

  let year = "";
  let period = {
    //might delete start and end at a later time if there is no need for it
    periodStart: "01-01",
    periodEnd: "12-31",
    periodName: "",
  };

  let goal = "";
  let goalValue;

  let goals = [];

  let currencyFormatter = Intl.NumberFormat("da-DA", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  });

  const setGoal = async () => {
    const res = await fetch("http://localhost:3000/goals", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        year,
        periodName: period.periodName,
        goal,
        goalValue,
      }),
      credentials: "include",
    });
  };

  const deleteGoal = async (goal) => {
    const res = await fetch("http://localhost:3000/goals", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: goal._id,
        year: goal.year,
        goal: goal.goal,
      }),
      credentials: "include",
    });
    const data = await res.json();
    goals = [...data];
  };

  const getGoals = async () => {
    goals = [];
    const res = await fetch("http://localhost:3000/goals/period", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        year,
        goal,
      }),
      credentials: "include",
    });
    const data = await res.json();
    goals = [...data];
  };
</script>

<div class="container">
  <div class="">
    <label for="goal">Goal</label>
    <select class="custom-input" bind:value={goal} name="goal" id="goal">
      <option value="revenue">Revenue</option>
      <option value="profit">Profit</option>
    </select>

    <label for="year">Year</label>
    <input
      style="outline-color: {$theme.color}"
      class="custom-input"
      name="year"
      type="number"
      bind:value={year}
    />
    <label for="period">Period</label>
    <select class="custom-input" bind:value={period} name="period" id="period">
      <option
        value={{
          periodStart: "01-01",
          periodEnd: "12-31",
          periodName: "year",
        }}>Whole Year</option
      >
      <option
        value={{
          periodStart: "01-01",
          periodEnd: "03-31",
          periodName: "Q1",
        }}>Q1</option
      >
      <option
        value={{
          periodStart: "04-01",
          periodEnd: "06-30",
          periodName: "Q2",
        }}>Q2</option
      >
      <option
        value={{
          periodStart: "07-01",
          periodEnd: "09-30",
          periodName: "Q3",
        }}>Q3</option
      >
      <option
        value={{
          periodStart: "10-01",
          periodEnd: "12-31",
          periodName: "Q4",
        }}>Q4</option
      >
      <option
        value={{
          periodStart: "01-01",
          periodEnd: "01-31",
          periodName: "Jan",
        }}>January</option
      >
      <option
        value={{
          periodStart: "02-01",
          periodEnd: "02-28",
          periodName: "Feb",
        }}>February</option
      >
      <option
        value={{
          periodStart: "03-01",
          periodEnd: "03-31",
          periodName: "Mar",
        }}>March</option
      >
      <option
        value={{
          periodStart: "04-01",
          periodEnd: "04-30",
          periodName: "Apr",
        }}>April</option
      >
      <option
        value={{
          periodStart: "05-01",
          periodEnd: "05-31",
          periodName: "May",
        }}>May</option
      >
      <option
        value={{
          periodStart: "06-01",
          periodEnd: "06-30",
          periodName: "Jun",
        }}>June</option
      >
      <option
        value={{
          periodStart: "07-01",
          periodEnd: "07-31",
          periodName: "Jul",
        }}>July</option
      >
      <option
        value={{
          periodStart: "08-01",
          periodEnd: "08-31",
          periodName: "Aug",
        }}>August</option
      >
      <option
        value={{
          periodStart: "09-01",
          periodEnd: "09-30",
          periodName: "Sep",
        }}>September</option
      >
      <option
        value={{
          periodStart: "10-01",
          periodEnd: "10-31",
          periodName: "Oct",
        }}>October</option
      >
      <option
        value={{
          periodStart: "11-01",
          periodEnd: "11-30",
          periodName: "Nov",
        }}>November</option
      >
      <option
        value={{
          periodStart: "12-01",
          periodEnd: "12-31",
          periodName: "Dec",
        }}>December</option
      >
    </select>
    <label for="goalValue">Value</label>
    <input
      style="outline-color: {$theme.color}"
      class="custom-input"
      name="goalValue"
      type="number"
      bind:value={goalValue}
    />

    <div style="display: flex;">
      <button
        style="border-color: {$theme.color};"
        class="custom-button"
        on:click={() => {
          setGoal();
        }}>create goal</button
      >
      <button
        style="border-color: {$theme.color};"
        class="custom-button"
        on:click={() => {
          getGoals();
        }}>get goals</button
      >
    </div>

    <div class="goals">
      <ul class="goal-list">
        <div class="headlines">
          <li>Goal</li>
          <li>Year</li>
          <li>Period</li>
          <li>Goal value</li>
          <li />
        </div>
        <hr />
        {#each goals as goal}
          <div class="goal">
            <li class="li">{goal.goal}</li>
            <li class="li">{goal.year}</li>
            <li class="li">{goal.periodName}</li>
            <li class="li">{currencyFormatter.format(goal.goalValue)}</li>
            <li
              on:click={() => {
                deleteGoal(goal);
              }}
            >
              <Trashcan width="1.35em" height="1.35em" />
            </li>
          </div>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
  }
  button {
    margin-top: 10px;
  }
  li {
    width: 100%;
    min-width: 130px;
    margin-top: 5px;
  }
  .headlines {
    display: flex;
    flex-direction: row;
  }
  .goal {
    display: flex;
  }
</style>
