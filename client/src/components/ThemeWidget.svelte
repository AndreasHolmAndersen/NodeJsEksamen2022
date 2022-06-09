<script>
  import io from "socket.io-client";
  const socket = io("http://localhost:3000");
  import { theme } from "../stores/stores";

  socket.on("theme", ({ data }) => {
    theme.set(data);
    console.log($theme);
  });

  const changeTheme = (data) => {
    socket.emit("themeChanged", { data: data });
  };
</script>

<div>
  <button
    class="green-theme"
    on:click={() => {
      changeTheme({
        themeName: "green-theme",
        color: "#2aa717",
      });
    }}
  />
  <button
    class="purple-theme"
    on:click={() => {
      changeTheme({
        themeName: "purple-theme",
        color: "#8379f7",
      });
    }}
  />
  <button
    class="coral-theme"
    on:click={() => {
      changeTheme({
        themeName: "coral-theme",
        color: "coral",
      });
    }}
  />
  <button
    class="pink-theme"
    on:click={() => {
      changeTheme({
        themeName: "pink-theme",
        color: "#d376b4",
      });
    }}
  />
  <button
    class="yellow-theme"
    on:click={() => {
      changeTheme({
        themeName: "yellow-theme",
        color: "#edd55e",
      });
    }}
  />
</div>

<style>
  .green-theme {
    background-color: #2aa717;
  }
  .purple-theme {
    background-color: #8379f7;
  }
  .coral-theme {
    background-color: coral;
  }
  .pink-theme {
    background-color: #d376b4;
  }
  .yellow-theme {
    background-color: #edd55e;
  }
  button:hover {
    opacity: 80%;
  }
  button {
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
