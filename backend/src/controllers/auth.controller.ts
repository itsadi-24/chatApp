// import { Request, Response } from 'express';
// import prisma from '../db/prisma.js';
// import bcryptjs from 'bcryptjs';
// import generateToken from '../utils/generateTokens.js';

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { fullname, username, password, confirmPassword, gender } = req.body;
//     if (!fullname || !username || !password || !confirmPassword || !gender) {
//       return res.status(400).json({ message: 'Please fill in all fields' });
//     }

//     // if (password.length < 6) {
//     //   return res
//     //     .status(400)
//     //     .json({ message: 'Password must be at least 6 characters long' });
//     // }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // check if user already exists
//     const existingUser = await prisma.user.findUnique({ where: { username } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // hash password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     // create new user
//     const newUser = await prisma.user.create({
//       data: {
//         fullname,
//         username,
//         password: hashedPassword,
//         gender,
//         profilePic:
//           gender === 'male'
//             ? `https://avatar.iran.liara.run/public/boy?username=${username}`
//             : `https://avatar.iran.liara.run/public/girl?username=${username}`,
//       },
//     });

//     if (!newUser) {
//       return res.status(400).json({ message: 'Invalid user data' });
//     }

//     // generate token
//     generateToken(newUser.id, res);

//     return res.status(201).json({
//       id: newUser.id,
//       fullname: newUser.fullname,
//       username: newUser.username,
//       profilePic: newUser.profilePic,
//     });
//   } catch (error: any) {
//     console.error('Error in signup controller', error.message);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     const user = await prisma.user.findUnique({ where: { username } });
//     if (!user) {
//       return res.status(400).json({ error: 'User name doesnt exists' });
//     }
//     const isPasswordCorrect = await bcryptjs.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }
//     generateToken(user.id, res);
//     res.status(200).json({
//       id: user.id,
//       fullname: user.fullname,
//       username: user.username,
//       profilePic: user.profilePic,
//     });
//   } catch (error: any) {
//     console.log('Error in login controller', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// export const logout = async (req: Request, res: Response) => {
//   try {
//     res.cookie('jwt', '', { maxAge: 0 });
//     res.status(200).json({ message: 'Logged out successfully' });
//   } catch (error: any) {
//     console.log('Error in logout controller', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// export const getMe = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: req.user.id } });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json({
//       id: user.id,
//       fullname: user.fullname,
//       username: user.username,
//       profilePic: user.profilePic,
//     });
//   } catch (error: any) {
//     console.log('Error in getMe controller', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
import { Request, Response } from 'express';
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateTokens.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      // generate token in a sec
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log('Error in getMe controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
