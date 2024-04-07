//import models
const { Thought, User } = require('../models');

//     deleteReaction

module.exports = {

    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findById({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a new thought 
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            if (!thought) {
                return res.status(404).json({ message: "Failed to create thought" });
            }

            //user Id passed in from req.body as createdBy
            const user = await User.findByIdAndUpdate(
                req.body.createdBy, //no need to wrap in object as managed via findByIdAndUpdate
                { $push: { thoughts: thought._id } }, //push new thought._id up to thoughts array _id auto assignd ObjectId
                { new: true } //only return updated
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found, error updating thought to user' })
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, //passed diectly not as object 
                req.body, //passed directly without $set as can be done with findByIdAndUpdate
                { runValidators: true, new: true }) //set to return object after update (ie. updated)

            if (!thought) {
                return res.status(404).json({ message: 'no thought found to update' });
            }
            res.json(thought);

        } catch (err) {
            console.error(err);
            res.status(500).json(err);

        }
    },

    // Delete thought and remove from user array
    async deleteThought(req, res) {
        try {

            //find and delete the thought
            const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deleteThought) {
                return res.status(404).json({ message: 'Error Deleting Thought' });
            }

            //delete from user Array using createdBy on thought
            const updateUser = await User.findByIdAndUpdate(
                deleteThought.createdBy, //taking field from the returned thought
                { $pull: { thoughts: deleteThought._id } }, //pull new thought._id out from users thoughts array _id auto assignd ObjectId
                { new: true } //only return updated
            );

            if (!updateUser) {
                return res.status(404).json({ message: 'User not found, error updating thought to user' })
            }

            res.json({ message: 'Thought successfully deleted', user: updateUser });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a reaction
    async createReaction(req, res) {
        try {
            //get the user who is creating it- so a name can be associated with the react
            const user = await User.findById(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            //update the thought by adding a new reaction
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: { ...req.body, username: user.username } } }, // include username
                { new: true, runValidators: true } // Return the updated document and enforce validation

            )

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            res.json(thought);

        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // delete a reaction
    async deleteReaction(req, res) {
        try {
                      //get thought and delete related reaction data
            const thoughtWithoutReaction = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.body.reactionId } } }, // pull from array via reactionId obj value
                { new: true, } // Return the updated document

            );
            if (!thoughtWithoutReaction) {
                return res.status(404).json({ message: 'Error updating reaction on Tthought' });
            }

            res.json(thoughtWithoutReaction);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

