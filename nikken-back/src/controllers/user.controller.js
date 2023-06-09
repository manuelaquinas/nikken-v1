const userService = require('../services/user.service');
const userProgressService = require('../services/userProgress.service');
const { generateHash } = require('../util/security/generteHash');

async function create(req, res, next) {
    const nikken_id = req.body.nikken_id

    const existingUser = await userService.getOne(nikken_id);
    if(!existingUser.isError) {
        if(existingUser.data.length) {
            return res.status(400).json(`User with nikken_id ${nikken_id} already exists`);
        }
    } else {
        return res.status(500).json(`Could not create user with nikken_id ${nikken_id}: ` + existingUser.error.message);
    }
    const user = await userService.create(req.body);
    if(!user.isError) {
        let userProgress = await userProgressService.create(nikken_id);
        if(!userProgress.isError) {
            return res.status(500).json(`Could not create user progress with nikken_id ${nikken_id}: ` + userProgress.error.message)
        }
        return res.status(200).json(`Created user with nikken_id ${nikken_id}`);
    } else {
        return res.status(500).json(`Could not create user with nikken_id ${nikken_id}: ` + user.error.message);
    }
}

async function getOne(req, res, next) {
    const nikken_id = req.params.nikken_id

    const user = await userService.getOne(nikken_id)
    if(!user.isError) {
        if(user.data.length) {
            return res.status(200).json(user.data)
        } else {
            return res.status(400).json('No user found by this Id')
        }
    } else {
        return res.status(500).json(`Could not get user with nikken_id ${nikken_id}: ` + user.error.message)
    }
}

async function update(req, res, next) {
    const nikken_id = req.params.nikken_id

    const user = await userService.update(nikken_id, req.body)
    if(!user.isError) {
        return res.status(200).json(`Updated user with nikken_id ${nikken_id}`)
    } else {
        return res.status(500).json(`Could not update user with nikken_id ${nikken_id}: ` + user.error.message)
    }
}

async function login(req, res, next) {
    const nikken_id = req.params.nikken_id

    const user = await userService.getOne(nikken_id)
    if(!user.isError) {
        let hash = generateHash()
        res.cookie('session', hash, { maxAge: 1800000, secure: false,  encode: String });
        res.cookie('nikken_id', nikken_id, { maxAge: 1800000, secure: false});
        return res.status(200).json(`logged in user with nikken_id ${nikken_id}`)
    } else {
        return res.status(500).json(`Could not log in user with nikken_id ${nikken_id}: ` + user.error.message)
    }
}

module.exports = {
    create, getOne, update, login
}
