async function get() {
  const response = await fetch(
    "https://gist.githubusercontent.com/shcyiza/71c64a33f3880e58980003c4c794db38/raw/febb04707f6ccc9ae3a445e147c5754e30f743fe/car_brands.json"
  );
  const data = await response.json();
  console.log(data);
  console.log(data.length);
  data.forEach(brands);

  function brands(item) {
    document.querySelector(
      "#brands"
    ).innerHTML += `<div class="mx-4  my-2"><img style="margin:auto" src="${item.logo}" width="125px" height="100px" alt="">
        <a href="/operation/brand/?brand=${item.name}" class="d-block text-center text-decoration-none">${item.name}</a></div>`;
  }
}
get();
