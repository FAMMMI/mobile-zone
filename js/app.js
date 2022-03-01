
// fetching mobile list from api
const searchMobile = () => {
    document.getElementById('search-result').innerHTML = "";
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    singledetails('none');
    displayError2('none');
    showmore('none');
    if (searchText == '') {
        displayError2('block');
        displayError('none');
        toggleSpinner('none');
        showmore('none');

    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status == false) {
                    displayError('block');
                    displayError2('none');
                    toggleSpinner('none');
                    showmore('none');

                }
                else {
                    displaySearchResult(data.data);
                    displayError('none');
                    displayError2('none');
                }
            });
        displayError('none');
        displayError2('none');
    }

}
// error messages
const displayError = error => {
    document.getElementById('error-message').style.display = error;
}
const displayError2 = error => {
    document.getElementById('error-message-2').style.display = error;
}
// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// blocking single details
const singledetails = displayStyle => {
    document.getElementById('singleDetails').style.display = displayStyle;
}
// show more button showing
const showmore = displayStyle => {
    document.getElementById('show-more').style.display = displayStyle;
}

// display search results for 20 mobiles
const displaySearchResult = (mobiles) => {
    const searchResult = document.getElementById('search-result');
    mobiles.slice(0, 20).forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card bg-light h-100 pt-3 ">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center ">
                    <h5 class="card-title">Name: ${mobile.phone_name}</h5>
                    <h5 class="card-text">Brand: ${mobile.brand}</h5>
                    
                    <button onclick="loadMobileDetail('${mobile.slug}')" class=" text-center button">details</button>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    });

    toggleSpinner('none');
    singledetails('none');
    showmore('block');

}
// extra +++ showing off all result
// fetching data
const searchAllMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    singledetails('none');
    displayError2('none');
    showmore('none');
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showAll(data.data))
}
// displaying all results
const showAll = (mobiles) => {
    const searchResult = document.getElementById('search-result');
    searchResult.value = '';
    document.getElementById('search-result').innerHTML = '';
    mobiles.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card bg-light h-100 pt-3 ">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center ">
                    <h5 class="card-title">Name: ${mobile.phone_name}</h5>
                    <h5 class="card-text">Brand: ${mobile.brand}</h5>
                    
                    <button onclick="loadMobileDetail('${mobile.slug}')" class=" text-center button">details</button>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    });

    toggleSpinner('none');
    singledetails('none');
    showmore('none');
}




// fetching mobile details by id
const loadMobileDetail = (mobileId) => {
    console.log(mobileId);
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDataDetails(data.data));
}

// showing mobile details
const showDataDetails = (mobile) => {
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
    if (mobile.hasOwnProperty('releaseDate') && mobile.releaseDate != "") release_date += mobile.releaseDate;
    else release_date += "Release Date is Not published .";

    for (const property in mobile.others) {
        otherFeatures += property + ": " + mobile.others[property] + ", "
    }
    if (otherFeatures == "") {
        otherFeatures += "Other features are not provoded yet."
    }
    div.innerHTML = `
                <div class="card align-items-center p-2 w-75 mx-auto bg-light">
                    <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                    <div class="card-body mx-auto w-100">
                        <h5 class="card-title">Name: ${mobile.name}</h5>
                        <h6 class="card-title"><strong>Brand: ${mobile.brand}</strong></h6>
                        <p class="card-text"><b>Storage:</b> ${mobile.mainFeatures.storage}</p>
                        <p class="card-text"><b>Display Size:</b> ${mobile.mainFeatures.displaySize}</p>
                        <p class="card-text"><b>Chipset:</b> ${mobile.mainFeatures.chipSet}</p>
                        <p class="card-text"><b>Memory:</b> ${mobile.mainFeatures.memory}</p>
                        <p class="card-text"><b>Sensors:</b> '${sensors}'</p>
                        <p class="card-text"><b>Release Data:</b> ${release_date}</p>
                        <p class="card-text"><b>Other Features:</b> <br>
                        ${otherFeatures} <br>
                        
                        </p>
                    </div>
                </div>
        `;
    singleDetail_Id.appendChild(div);
    singledetails('block');
}