async function get() {
  const response = await fetch(
    "https://api.countapi.xyz/get/cars.com/1870680f-0598-4e26-bca7-6dbd5553d69f"
  );
  const data = await response.json();
  console.log(data.value);
  document.querySelector("#visits").textContent = data.value;
}
get();
