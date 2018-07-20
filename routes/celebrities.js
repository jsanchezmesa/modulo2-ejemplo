const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

/* CRUD -> READ ALL */
router.get('/', (req, res, next) => {

  Celebrity.find()
  .then((celebrities) => {
    res.render('celebrities/index', {celebrities});
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });

});

/* RENDER NEW FORM */
router.get('/new', (req, res, next) => {
  res.render("celebrities/new");
});

/* CRUD -> CREATE POST */
router.post('/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  newCelebrity.save()
  .then(c => {
    console.log(c)
    res.redirect("/celebrities");
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });

});

/* CRUD -> READ DETAIL */
router.get('/:id', (req, res, next) => {

  Celebrity.findById(req.params.id)
  .then (celebrity => res.render('celebrities/show', { celebrity }))
  .catch(err => next(err)); 
  
});

/* CRUD -> DELETE ELEMENT */
router.get('/:id/delete', (req, res, next) => {

  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/celebrities");
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });

});

router.get('/:id/edit', (req, res, next) => {

  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render("celebrities/edit", { celebrity });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });

});

router.post("/:id/edit", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const updates = { name, occupation, catchPhrase };

  Celebrity.findByIdAndUpdate(req.params.id, updates)
  .then(() => {
    res.redirect("/celebrities");
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
  
});

module.exports = router;