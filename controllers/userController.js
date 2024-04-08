//import models.. "if you export with curly braces you import with curly braces"
const { User, Thought } = require('../models')

module.exports = {

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getOneUser(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts') //populate = all fields from thoughts linked (via ObjId on model) to this user
                .populate('friends'); //populate = all fields from friends linked (via ObjId on model) to this user

            if (!user) {
                return res.status(404).json({ message: 'No user found' })
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update User
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId, //passed diectly not as object 
                req.body, //passed directly without $set as can be done with findByIdAndUpdate
                { runValidators: true, new: true }) //set to return object after update (ie. updated)

            if (!user) {
                return res.status(404).json({ message: 'no user found to update' });
            }
            res.json(user);

        } catch (err) {
            console.error(err);
            res.status(500).json(err);

        }
    },

    // Delete user and all of their associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId); //method uses id directly not as object

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thoughts = await Thought.deleteMany({ createdBy: req.params.userId });

            if (thoughts.deletedCount === 0) {
                return res.status(404).json({
                    message: 'user deleted, but no thoughts founds',
                });
            }

            res.json({ message: 'User and associated thoughts successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a friend to user
    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params; //quick way to get both params from route api/users/:userId/friends/:friendId
            console.log("User ID received:", userId);
            console.log("Friend ID received:", friendId);


            //validate user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            //validate friend exists
            const friend = await User.findById(friendId);
            if (!friend) {
                return res.status(404).json({ message: 'No such friend exists' });
            }

            // Prevent adding yourself as a friend
            if (userId === friendId) {
                return res.status(400).json({ message: "Users cannot add themselves as a friend." });
            }

            //add friend to users friends list, use $addToSet to prevent duplicates (only adds if doesnt exist)
            const userWithFriend = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true },) //updated doc returned (returns post-update)
                .populate('friends');

            //add user to friends friends list also, use $addToSet to prevent duplicates (only adds if doesnt exist)
            const friendWithFriend = await User.findByIdAndUpdate(
                friendId,
                { $addToSet: { friends: userId } },
                { new: true },) //updated doc returned (returns post-update)
                .populate('friends');

            if (!friendWithFriend) {
                return res.status(404).json({ message: 'Error adding you as a friend to the their friends list' });
            }

            res.json(userWithFriend)
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // deleteFriend frmo User
    async deleteFriend(req, res) {
        try {
            const { userId, friendId } = req.params; //quick way to get both params from route api/users/:userId/friends/:friendId

            //check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            //check if friend exists
            const friend = await User.findById(friendId);
            if (!friend) {
                return res.status(404).json({ message: 'No such friend exists' });
            }

            const removedFromUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true } //return update doc only 
            );

            if (!removedFromUser) {
                return res.status(404).json({ message: 'Error removing friend from user' });
            }
            //break the two way friendship and remove yourself from friend's array also
            const removedFromFriend = await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } },
                { new: true } //return update doc only 
            );

            if (!removedFromFriend) {
                return res.status(404).json({ message: 'Error removing you as a friend from the their friends list' });
            }

            res.json(removedFromUser);

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};