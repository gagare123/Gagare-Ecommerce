import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: "clerk/user.created"
    },
    async ({event}) =>{
        const {id, first_name, last_name, email_addresses, imaage_url}
         = event.data
         const userData = {
            _id: id,
            email: email_addresses[o].email_addresses,
            name: first_name + '' + last_name,
            imageUrl: imaage_url
         }
        await connectDb()
        await User.create(userData)
    }
)

//Image function to update user data in the databese
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {event: 'clerk/user.updated'},
    async ({event}) =>{
    const {id, first_name, last_name, email_addresses, imaage_url}
         = event.data
         const userData = {
            _id: id,
            email: email_addresses[o].email_addresses,
            name: first_name + '' + last_name,
            imageUrl: imaage_url
         }
         await connectDb()
         await User.findByIdAndUpdate(id, userData)
    }
)

// Inngest function to delete user from databe
export const syncUserDeletiomn = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        const {id} = event.data

        await connectDb()
        await User.findByIdAndDelete(id)
    }
)