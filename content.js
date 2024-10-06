function extractProductInfo() {
    const title = document.querySelector('.product-detail-info__header-name');
    const productName = title ? title.innerText : null; 

    if (!productName) {
        console.log('Not a product page.');
        return; 
    }

    const price = document.querySelector('.price__amount');
    const productPrice = price ? price.innerText : 'Price not found'; 

    const image = document.querySelector(`.media-image__image, .media__wrapper--media[alt="${productName}"]`);
    const imageUrl = image ? image.src : 'Image not found'; 

    const productInfo = {
        name: productName,
        price: productPrice,
        imageUrl: imageUrl
    };

    chrome.storage.local.set({ productInfo }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error in product info:', chrome.runtime.lastError);
        } else {
            console.log('Product : \n', productInfo.name, '\n', productInfo.price, '\n', productInfo.imageUrl);
        }
    });
}

let lastUrl = location.href;
function detectUrlChange() {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        window.location.reload(); 
    }
}

extractProductInfo();
setInterval(detectUrlChange, 1000); 