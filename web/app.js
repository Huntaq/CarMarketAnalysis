document.addEventListener('DOMContentLoaded', () => {
    fetchBrands();
    fetchCars(); 
});

let cars = [];

async function fetchBrands() {
    try {
        const response = await fetch('/api/brands'); 
        const brands = await response.json();

        const brandFilter = document.getElementById('brandFilter');
        brandFilter.innerHTML = '<option value="">Wszystkie Marki</option>';

        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.textContent = brand.name;
            brandFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Błąd podczas pobierania marek:', error);
    }
}

async function fetchModels(brandId) {
    try {
        const response = await fetch(`/api/brands/${brandId}/models`);
        const models = await response.json();

        const modelFilter = document.getElementById('modelFilter');
        modelFilter.innerHTML = '<option value="">Wszystkie Modele</option>';

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            modelFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Błąd podczas pobierania modeli:', error);
    }
}

async function fetchCars(brandId, modelId) {
    try {
        let url = '/api/cars';
        if (brandId || modelId) {
            url += `?brandId=${brandId}&modelId=${modelId}`;
        }

        const response = await fetch(url); 
        cars = await response.json();

        const carList = document.getElementById('carList');
        carList.innerHTML = '';

        cars.forEach(car => {
            const carItem = document.createElement('li');
            carItem.className = 'car-item';
            carItem.textContent = `${car.name} - ${car.price} ${car.currency}`;

            carItem.addEventListener('click', () => wyswietlSzczegolySamochodu(car));

            carList.appendChild(carItem);
        });
    } catch (error) {
        console.error('Błąd podczas pobierania samochodów:', error);
    }
}

function filtrujSamochody() {
    const selectedBrand = document.getElementById('brandFilter').value;
    const selectedModel = document.getElementById('modelFilter').value;

    fetchCars(selectedBrand, selectedModel);
}

function szukajSamochodow() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchInput));

    const carList = document.getElementById('carList');
    carList.innerHTML = '';

    filteredCars.forEach(car => {
        const carItem = document.createElement('li');
        carItem.className = 'car-item';
        carItem.textContent = `${car.name} - ${car.price} ${car.currency}`;

        carItem.addEventListener('click', () => wyswietlSzczegolySamochodu(car));

        carList.appendChild(carItem);
    });
}

function wyswietlSzczegolySamochodu(car) {
    const carDetails = document.getElementById('carDetails');
    carDetails.innerHTML = '';

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';

    const title = document.createElement('h2');
    title.textContent = `${car.name} - ${car.price} ${car.currency}`;

    

    detailsContainer.appendChild(title);
    carDetails.appendChild(detailsContainer);
}
