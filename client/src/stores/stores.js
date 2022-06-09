import { writable } from "svelte/store";

export const user = writable(null);
export const ordersFromPeriods = writable([]);
export const periodsStore = writable([]);
export const goals = writable([]);
export const theme = writable({ color: "gray" });
