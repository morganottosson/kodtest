const router = require('express').Router();
const components = require('../components');
var async = require('async');
var await = require('await');

const SchemaValidator = require('../middlewares/schemaValidator');

const validateRequest = SchemaValidator(true);

router.get('/find', async (req, res) => {
    const player = req.query.input;
    try {
        return res.json(await components.player.getPlayer(player));
    } catch (err) {
        res.json(err);
    }
});

router.get('/findAll', async (req, res) => {
    try {
        return res.json(await components.player.getAllPlayers());
    } catch (err) {
        res.json(err);
    }
});

router.post('/savePlayer', validateRequest, async (req, res) => {
    const name = req.body.name;
    try {
        return res.json(await components.player.savePlayer(name));
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;