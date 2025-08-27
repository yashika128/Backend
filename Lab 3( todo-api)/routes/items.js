// routes/items.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dataFile = path.join(__dirname, '../data/items.json');

// Helper to read/write JSON
function readItems() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
}

function saveItems(items) {
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
}

// ----------- ROUTES -----------

// GET all items
router.get('/', (req, res) => {
  const items = readItems();
  res.json(items);
});

// POST create new item
router.post('/', (req, res) => {
  const items = readItems();
  const newItem = {
    id: Date.now().toString(),
    task: req.body.task || 'Untitled Task',
    done: false,
  };
  items.push(newItem);
  saveItems(items);
  res.status(201).json(newItem);
});

// PUT update an item
router.put('/:id', (req, res) => {
  const items = readItems();
  const index = items.findIndex((i) => i.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items[index] = {
    ...items[index],
    task: req.body.task ?? items[index].task,
    done: req.body.done ?? items[index].done,
  };

  saveItems(items);
  res.json(items[index]);
});

// DELETE an item
router.delete('/:id', (req, res) => {
  const items = readItems();
  const filtered = items.filter((i) => i.id !== req.params.id);

  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Item not found' });
  }

  saveItems(filtered);
  res.json({ message: 'Item deleted ✅' });
});

module.exports = router;
