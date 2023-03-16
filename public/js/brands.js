async function get(){
    const response=await fetch("https://gist.githubusercontent.com/shcyiza/71c64a33f3880e58980003c4c794db38/raw/febb04707f6ccc9ae3a445e147c5754e30f743fe/car_brands.json")
    const data = await response.json()
    console.log(data)
    console.log(data.length);
    data.forEach(brands);

     function brands(item) {
        document.querySelector("#types").innerHTML+=`<option value="${item.name}">`
    }
}
get()