# Supply Chain Analytics Dashboard

An interactive, browser-based demonstration dashboard using fictional warehouse inventory data.

## Features
- Inventory item count and stock value KPIs.
- Warehouse filter.
- Search by SKU or product.
- Low-stock and reorder attention indicators.
- Responsive layout.

## Run locally
No Node.js or build tools are required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Use the search box and warehouse filter to explore the demonstration data.

## Data disclaimer
All records are fictional demonstration data. They do not represent any employer, customer or real warehouse.

## KPI definitions
- **Stock value:** sum of quantity on hand multiplied by unit cost.
- **Low stock:** quantity on hand is below the reorder point.
- **Items shown:** number of records after applying current filters.

## Next improvements
- Import CSV files with validation.
- Add date-based stock movement trends.
- Add unit tests for KPI calculations.
- Add export to CSV and accessible chart alternatives.
