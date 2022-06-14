<script>
  import { theme } from "../stores/stores";

  export let size = 200;
  export let percent = 0;
  let bgColor = "white";

  $: viewBox = `0 0 ${size} ${size}`;

  $: radius = size / 2;
  $: halfCircumference = Math.PI * radius;
  $: pieSize = halfCircumference * (percent / 100);
  $: dashArray = `0 ${halfCircumference - pieSize} ${pieSize}`;
</script>

<svg width={size} height={size} {viewBox}>
  <circle
    r={radius - 1}
    cx={radius}
    cy={radius}
    fill={bgColor}
    stroke={$theme.color}
    stroke-width={1}
  />
  <circle
    r={radius / 2}
    cx={radius}
    cy={radius}
    fill={bgColor}
    stroke={$theme.color}
    stroke-width={radius}
    stroke-dasharray={dashArray}
  />
</svg>
