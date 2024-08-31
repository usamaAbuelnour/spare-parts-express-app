const express = require('express');
const { getFavoriteParts, setFavoriteParts, deleteFavoriteParts } = require('../controllers/favoriteParts');
const router = express.Router();

router.get('/', getFavoriteParts)
router.post('/', setFavoriteParts)
router.delete('/:id', deleteFavoriteParts);


module.exports = router;