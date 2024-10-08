# Zara Product Info Extractor Chrome Extension

## Description

The **Zara Product Info Extractor** is a Chrome extension designed to extract product information from Zara product pages. It retrieves details such as the product name, price, and image, and also provides similar product recommendations from H&M. This tool is perfect for users looking to compare products or find alternatives while shopping online.

## Features

- **Product Information Extraction**: Automatically extracts the product name, price, and image from Zara product pages.
- **Similar Products**: Fetches and displays similar products from H&M using their API.
- **User-Friendly Interface**: Displays product information and recommendations in a clean, easy-to-read format.
- **Dynamic Updates**: Automatically updates the displayed product information when navigating through different products on the Zara website.

## Demo

https://drive.google.com/file/d/1zjTqiCYqwNZH5x5W5q8-uDmipXhuIx8Z/view?usp=drive_link

## Installation

1. **Download the extension**: Clone or download this repository.

   ```bash
   git clone https://github.com/kaushiktak19/extension-zara.git

2. **Open Chrome**: Launch Google Chrome and navigate to chrome://extensions/.

3. **Enable Developer Mode**: Toggle the "Developer mode" switch at the top right corner of the page.

4. **Load Unpacked Extension**: Click on the "Load unpacked" button and select the folder where you cloned/downloaded the extension.

5. **Pin the Extension**: Once added, pin the extension to your Chrome toolbar for easy access.

# Usage
1. Navigate to a product page on the Zara website (e.g., https://www.zara.com/).

2. Click on the extension icon in the Chrome toolbar to open the popup.

3. View the extracted product information (name, price, image) and similar products from H&M.

4. The extension automatically refreshes the information when you navigate to another product page on Zara.


## File Descriptions

- **`manifest.json`**: The main configuration file for the Chrome extension, defining its metadata, permissions, and background scripts.

- **`content.js`**: This script runs in the context of Zara product pages and is responsible for extracting the product name, price, and image URL.

- **`popup.html`**: The HTML file that creates the popup interface displayed when the extension icon is clicked.

- **`popup.js`**: JavaScript file that handles the behavior of the popup, including retrieving stored product information and fetching similar products from the H&M API.

- **`styles.css`**: The stylesheet used to style the popup interface for a clean and user-friendly appearance.
