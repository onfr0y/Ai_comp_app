import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
    res.send('test1234')
})

export default router
