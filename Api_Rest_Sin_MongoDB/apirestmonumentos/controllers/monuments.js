'use strict'

const MonumentsService = require('../services/monuments');

let controller = {
    getController: (req, res) => {
        let result = MonumentsService.getData();
        if (result.length == 0) {
            res.status(404).json(result);
        } else {
            res.status(200).json(result);
        }
    }, getByIdController: (req, res) => {
        let result = MonumentsService.getOneDataById(req.params.id);
        if (result == null) {
            res.status(404).json(result);
        } else {
            res.status(200).json(result);
        }
    }, postController: (req, res) => {
        let result = MonumentsService.postData(req.body);
        if (result[0] == result[1]) {
            res.status(400).json({
                ArrayLength: result[0],
                ArrayLengthWithPost: result[1], AddedMonument: result[3]
            });
        } else {
            res.status(201).json({
                ArrayLength: result[0],
                ArrayLengthWithPost: result[1], AddedMonument: result[3]
            });
        }
    }, putController: (req, res) => {
        let result = MonumentsService.updateDataById(req.body);
        if (result[0] == true) {
            res.status(200).json(result[1]);
        } else {
            res.status(400).json(result[1]);
        }
    }, deleteByIdController: (req, res) => {
        if(req.user.rol == "SUPER_ADMIN"){
            let result = MonumentsService.deleteById(req.params.id);
            if (result == null) {
                res.status(400).json(result);
            } else {
                res.status(204).json(result);
            }
        } else {
            res.status(403).json({error: "Not authenticated with rol SUPER_ADMIN"});
        }
    }
}

module.exports = controller;