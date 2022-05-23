import { writable } from "svelte/store";

export const user = writable(null);
export const dataFromPeriods = writable([]);
export const periodsStore = writable([]);

