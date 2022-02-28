
const searchMobile = () => {
    console.log('clicked');
    document.getElementById('search-result').innerHTML = "";
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText == '') {
        displayError('block');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status == false) {
                    displayError('block');

                }
                else {
                    displaySearchReslt(data.data);
                    displayError('none');
                }
            })
            .catch(error => displayError(error));
    }
}
// searchMobile();

const displayError = error => {
    document.getElementById('error-message').style.display = error;
}


const displaySearchReslt = (mobiles) => {
    const searchResult = document.getElementById('search-result');
    // searchResult.textContent = '';
    console.log(mobiles.slice(0, 20));
    mobiles.slice(0, 20).forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 pt-3">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">Name: ${mobile.phone_name}</h5>
                    <h5 class="card-text">Brand: ${mobile.brand}</h5>
                    <button onclick="loadMobileDetail('${mobile.slug}')" class=" text-center">details</button>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMobileDetail = (mobileId) => {
    console.log(mobileId);
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDataDetails(data.data));
}

const showDataDetails = (mobile) => {
    console.log(mobile);
    const singleDetail_Id = document.getElementById('singleDetails');
    singleDetail_Id.innerHTML = "";
    let div = document.createElement('div');
    div.classList.add('col');
    let sensors = "", release_date = "", otherFeatures = "";
    for (let i = 0; i < mobile.mainFeatures.sensors.length; i++) {
        if (i == mobile.mainFeatures.sensors.length - 1) {
            sensors += mobile.mainFeatures.sensors[i];
            continue;
        }
        sensors += mobile.mainFeatures.sensors[i] + ", ";
    }
    console.log(sensors);
    if (mobile.hasOwnProperty('releaseDate') && mobile.releaseDate != "") release_date += mobile.releaseDate;
    else release_date += "Release Date Not published";

    for (const property in mobile.others) {
        // console.log(${property}: ${data.others[property]});
        otherFeatures += property + ": " + mobile.others[property] + ", "
    }
    if (otherFeatures == "") {
        otherFeatures += "Other features not provoded yet."
    }
    div.innerHTML = `
                <div class="card align-items-center p-2 w-75 mx-auto">
                    <img src="${mobile.image}" class="card-img-top w-25 mx-auto" alt="...">
                    <div class="card-body mx-auto">
                        <h3 class="card-title">Name: ${mobile.name}</h3>
                        <h4 class="card-title">Brand: ${mobile.brand}</h4>
                        <p class="card-text"><b>Storage:</b> ${mobile.mainFeatures.storage}</p>
                        <p class="card-text"><b>Display Size:</b> ${mobile.mainFeatures.displaySize}</p>
                        <p class="card-text"><b>Chipset:</b> ${mobile.mainFeatures.chipSet}</p>
                        <p class="card-text"><b>Memory:</b> ${mobile.mainFeatures.memory}</p>
                        <p class="card-text"><b>Sensors:</b> ${sensors}</p>
                        <p class="card-text"><b>Release Data:</b> ${release_date}</p>
                        <p class="card-text"><b>Other Features:</b> ${otherFeatures}</p>
                    </div>
                </div>
        `;
    singleDetail_Id.appendChild(div);
}