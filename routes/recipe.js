const express = require('express');
const router = express.Router();
const config = require('../config/database');


const Recipe = require('../models/recipes');

//GET  /api/recipes  — returns all recipes in database
router.get('/recipes',(req, res, next) => {
    Recipe.find().then(
        (recipe) => {
          res.status(200).json(recipe);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
})


//GET  /api/recipes/:id  — returns the recipe with the provided ID from the database
router.get('/recipes/:id',(req, res, next) => {
    Recipe.findOne({
        _id: req.params.id
      }).then(
        (recipe) => {
          res.status(200).json(recipe);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
})


//POST  /api/recipes  — adds a new recipe to the database
router.post('/recipes',(req, res, next) => {

    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
      });
      recipe.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );


})

//PUT  /api/recipes/:id  — modifies the recipe with the provided ID
router.put('/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
      _id: req.params.id,
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      time: req.body.time
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


  //DELETE  /api/recipes/:id  — deletes the recipe with the provided ID
  router.delete('/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });



module.exports = router;