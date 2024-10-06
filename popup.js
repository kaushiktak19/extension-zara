document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('productInfo', (data) => {
        console.log('Retrieved data:', data); 
        const productInfo = data.productInfo;

        if (productInfo) {
            document.getElementById('product-name').innerText = productInfo.name;
            document.getElementById('product-price').innerText = productInfo.price;

            const image = document.getElementById('product-image');
            if (productInfo.imageUrl && productInfo.imageUrl !== 'Image not found') {
                image.src = productInfo.imageUrl; 
                image.onerror = () => {
                    console.error('Image failed to load:', productInfo.imageUrl);
                    image.alt = 'Image not available'; 
                };
            } else {
                console.log('Image URL not found or invalid');
                image.alt = 'Image not available'; 
            }
            findSimilarProducts(productInfo.name);
        } else {
            document.getElementById('product-info').innerText = 'No product info available.';
        }
    });
});

async function findSimilarProducts(productName) {
    let load = true; 
    const loadingMessage = document.getElementById('loading');
    loadingMessage.style.display = 'block';

    if (!productName) {
        console.error('Product name is not available.');
        load = false; 
        loadingMessage.style.display = 'none'; 
        return; 
    }

    const words = productName.split(' ');
    //const firstWord = words[0];
    const relevantWord = words.length > 1 ? words[1] : words[0];
    const encodedProductName = encodeURIComponent(relevantWord); 
    const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=in&lang=en&currentpage=0&pagesize=30&query=${encodedProductName}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '79c7fb97f7msha0e2f3e654fa2b4p1648cfjsn503e8e38c4bd', 
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('Similar Products:', data);
        load = false; 
        loadingMessage.style.display = 'none'; 
        displaySimilarProducts(data); 
    } catch (error) {
        console.error('Error fetching similar products:', error);
        loadingMessage.style.display = 'none'; 
        alert('Could not fetch similar products. Please try again later.'); 
    }
}

function displaySimilarProducts(data) {
    const similarProductsContainer = document.getElementById('similar-products');
    similarProductsContainer.innerHTML = '';

    if (data.results && data.results.length > 0) {
        const productsToShow = data.results.slice(0, 6);

        productsToShow.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'similar-product';

            const productLink = document.createElement('a');
            productLink.href = `https://www2.hm.com${product.linkPdp}`;
            productLink.target = '_blank';

            const productImage = document.createElement('img');
            productImage.src = product.images && product.images.length > 0 ? product.images[0].url : 'placeholder-image-url';
            productImage.alt = product.name; 

            const productName = document.createElement('p');
            productName.innerText = product.name; 

            const productPrice = document.createElement('p');
            productPrice.innerText = product.price ? `Price: ${product.price.formattedValue}` : 'Price not available'; 

            productLink.appendChild(productImage);
            productLink.appendChild(productName);

            productDiv.appendChild(productLink);
            productDiv.appendChild(productPrice); 
            similarProductsContainer.appendChild(productDiv); 
        });
    } else {
        similarProductsContainer.innerHTML += '<p>No similar products found.</p>';
    }
}