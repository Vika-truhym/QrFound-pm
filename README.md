[![CI/CD Pipeline](https://github.com/Vika-truhym/QrFound-pm/actions/workflows/main.yml/badge.svg)](https://github.com/Vika-truhym/QrFound-pm/actions/workflows/main.yml)
# QR-Found 

## Description
QR-Found is a web application that allows users to generate QR codes for their personal items.  
Each QR code links to a page with the owner's contact information, helping to return lost items quickly.

## Features
- Create QR codes for items
- Store user and item data in MongoDB
- Generate unique QR-based link for each item
- Download QR codes as PNG or PDF
- QR code scanning support
- Contact owner via phone, email, or Telegram
- Responsive UI interface

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation
```bash
npm install
```
## Run the project
```bash
node server.js
```
## API Endpoints 

- `POST /create` – Create new item and generate QR code  
- `GET /item/:item_id` – View item information (opened after QR scan)  
- `GET /generate_qr/:item_id` – Generate QR code image (PNG)  
- `GET /generate_qr/:item_id?download=png` – Download QR code as PNG  
- `GET /generate_pdf/:item_id` – Download printable PDF with QR code  
- `GET /faq` – Frequently asked questions page  
- `GET /` – Main landing page (create & scan QR)
## Author 
Viktoriia Trukhym
