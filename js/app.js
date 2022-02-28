document.getElementById('error-message').style.display = 'none';
const searchMobile = () => {
    console.log('clicked');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchReslt(data.data))
            .catch(error => displayError(error));
    }
}
// searchMobile();
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}


const displaySearchReslt = (mobiles) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    console.log(mobiles);
    mobiles.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 pt-3">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">Name: ${mobile.phone_name}</h5>
                    <h5 class="card-text">Brand: ${mobile.brand}</h5>
                    <button onclick="loadMealDetail(${mobile.slug})" class=" text-center">details</button>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}