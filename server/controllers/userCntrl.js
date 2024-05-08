import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaconfig.js'


//function to create a user
// export const createUser = asyncHandler(async (req, res) => {
//     console.log("creating a user");

//     let { email } = req.body;
//     const userExists = await prisma.user.findUnique({
//         where: { email: email }
//     });

//     if (!userExists) {
//         const user = await prisma.user.create({ data: req.body });
//         const token = signAccessTokenService(email);
//         res.status(201).json({
//             message: "User registered successfully",
//             user: user,
//             token: token
//         })
//     } else res.status(409).send({ message: "User already registered" });
// });
export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");

    let { email } = req.body;
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: "User registered successfully",
            user: user,
        })
    } else res.status(201).send({ message: "User already registered" });
});

//function to a user to bookVisit
export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body
    const { id } = req.params

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisit: true },
        });

        if (alreadyBooked.bookedVisit.some((visit) => visit.id === id)) {
            res.status(400).json({ message: "This residency is already booked by you" });
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisit: { push: { id, date } },
                },
            });
            res.send("your visit is booked successfully");
        }

    } catch (err) {
        throw new Error(err.message);
        res.status(500).send({ message: "Error booking the visit" });
    }
});

//function to get all user bookings
export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true }
        })
        res.status(200).send(bookings)
    } catch (err) {
        throw new Error(err.message);
    }
})

//function for a user to cancel bookings
export const cancelBooking = asyncHandler(async (req, res) => {

    const { email } = req.body;
    const { id } = req.params;

    try {

        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true },
        });

        const index = user.bookedVisit.findIndex((visit)=> visit.id === id);

        if (index === -1) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            user.bookedVisit.splice(index, 1);
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisit: user.bookedVisit
                },
            });

            res.send("Booking cancelled successfully")
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

//add residency to fav list of users
// export const toFav = asyncHandler(async(req, res) => {
//     const {email} = req.body
//     const {rid} = req.params

//     try {
//         const user = await prisma.findUnique({
//             where: {email}
//         })

//         if (user.favResidenciesID.includes(rid)) {
//             const updateUser = await prisma.user.update({
//                 where:{email},
//                 data: {
//                     favResidenciesID: {
//                         set: user.favResidenciesID.filter((id)=> id !== rid)
//                     }
//                 }
//             })
//             res.send({message: "Removed from favourites", user: updateUser})
//         } else {
//             const updateUser = await prisma.user.update({
//                 where:{email},
//                 data: {
//                     favResidenciesID: {
//                         push: rid
//                     }
//                 }
//             })
//             res.send({message:"favourites updated", user: updateUser})
//         }
//     } catch (err) {
//         throw new Error(err.message)
//     }
// })

export const toFav = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const {rid} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            return res.status(404).send({message: "User not found"});
        }

        const isFavourite = user.favResidenciesID.includes(rid);
        const updateUser = await prisma.user.update({
            where: {email},
            data: {
                favResidenciesID: isFavourite
                    ? { set: user.favResidenciesID.filter(id => id !== rid) }
                    : { push: rid }
            }
        });

        const message = isFavourite ? "Removed from favourites" : "Added to favourites";
        res.send({message, user: updateUser});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
});

//function to get all favourites
export const allFav = asyncHandler(async(req, res) => {
    const {email} = req.body

    try {
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesID: true}
        })
        res.status(200).send(favResd)
    } catch (err) {
        throw new Error(err.message)
    }
})