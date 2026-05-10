const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const mongoose = require("mongoose");

// =======================
// HOME PAGE
// =======================
router.get("/", (req, res) => {
    res.render("index", {
        openModal: req.query.openModal === "true",
    });
});


// =======================
// CREATE ITEM + QR
// =======================
router.post("/create", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();

        const qrUrl = `${process.env.BASE_URL}/item/${newItem._id}`;
        const qrCodeImage = await QRCode.toDataURL(qrUrl);

        res.render("success", {
            name: newItem.owner_name,
            qr: qrCodeImage,
            itemId: newItem._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating item");
    }
});


// =======================
// ITEM PAGE (after scan)
// =======================
router.get("/item/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) return res.status(404).send("Item not found");

        res.render("item", { item });
    } catch (err) {
        res.status(500).send("Server error");
    }
});


// =======================
// QR IMAGE (PNG download)
// =======================
router.get("/qr/:id", async (req, res) => {
    try {
        const url = `${process.env.BASE_URL}/item/${req.params.id}`;
        const qrBuffer = await QRCode.toBuffer(url);

        res.setHeader("Content-Type", "image/png");
        res.send(qrBuffer);
    } catch (err) {
        res.status(500).send("QR error");
    }
});


// =======================
// PDF GENERATION
// =======================
router.get("/pdf/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send("Not found");

        const url = `${process.env.BASE_URL}/item/${req.params.id}`;

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=QR_Found_${req.params.id}.pdf`
        );
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);

        // HEADER
        doc.fontSize(22).text("QR-Found", { align: "center" });
        doc.moveDown();

        // INFO
        doc.fontSize(14).text(`Item: ${item.item_name}`);
        doc.text(`Owner: ${item.owner_name}`);
        doc.text(`Email: ${item.email}`);
        doc.text(`Phone: ${item.country_code}${item.phone}`);

        doc.moveDown();
        doc.text("Scan QR below:");

        // QR
        const qrImage = await QRCode.toDataURL(url);
        doc.image(qrImage, {
            fit: [200, 200],
            align: "center",
        });

        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).send("PDF error");
    }
});


// =======================
// FAQ PAGE
// =======================
router.get("/faq", (req, res) => {
    res.render("faq");
});

module.exports = router;