import { Request, Response } from 'express';
import UserModel from '../models/User';
import { generateUniqueId } from '../utils/generateUniqueId';


// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Generate a unique profile ID
    const profileId = generateUniqueId();

    // Create the user document
    const user = new UserModel({
      username,
      profileId,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ profileId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a wallet for the user
export const createWallet = async (req: Request, res: Response) => {
    try {
      const { profileId, displayName, email, gender, age, links, bio } = req.body;
  
      // Find the user by profileId
      const user = await UserModel.findOne({ profileId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user document with wallet-related fields
      user.displayName = displayName;
      user.email = email;
      user.gender = gender;
      user.age = age;
      user.links = links;
      user.bio = bio;
  
      // Save the updated user to the database
      await user.save();
  
      res.status(200).json({ message: 'Wallet created successfully' });
    } catch (error) {
      console.error('Error creating wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Get user profile by profileId
export const getUserProfile = async (req: Request, res: Response) => {
    try {
      const { profileId } = req.params;
  
      // Find the user by profileId
      const user = await UserModel.findOne({ profileId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Update selected segments for the user
export const updateSegments = async (req: Request, res: Response) => {
    try {
      const { profileId, selectedSegments } = req.body;
  
      // Find the user by profileId
      const user = await UserModel.findOne({ profileId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user document with the new selected segments
      user.selectedSegments = selectedSegments;
  
      // Save the updated user to the database
      await user.save();
  
      res.status(200).json({ message: 'Segments updated successfully' });
    } catch (error) {
      console.error('Error updating segments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

