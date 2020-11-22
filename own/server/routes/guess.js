import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return NaN
  }
  return parsed
}

// nothing needed to do here, just getNumber to set a number.
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // if (guessed !== 0 && !guessed) {
  //   res.status(500).send({ msg: 'No number provided.' })
  // }

  // TODO: checked if number and guessed are the same, response with some hint
  console.log(guessed)
  if (Number.isNaN(guessed)){
    res.status(200).send({ msg: `"${req.query.number}" is not a number! Vegetabrious!` })
  }
  else{
    if (guessed > 100 || guessed <= 0){
      res.status(200).send({ msg: 'Are you an illiterate? Out of Range!' })
    }
    if (guessed < number) {
      res.status(200).send({ msg: 'Guess Larger' })
    }
    else if (guessed > number) {
      res.status(200).send({ msg: 'Guess Smaller' })
    }
    else{
      res.status(200).send({ msg: 'Correct' })
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started again.' })
})
export default router
