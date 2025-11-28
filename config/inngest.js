import { Inngest } from "inngest";
import connectDb from "./db";
import Order from "@/models/Order";

// Create Inngest client with explicit keys
export const inngest = new Inngest({
  id: "quickcart-next",
  eventKey: process.env.INNGEST_EVENT_KEY
});

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    const User = (await import("@/models/User")).default;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await connectDb();
    await User.create(userData);
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    const User = (await import("@/models/User")).default;

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await connectDb();
    await User.findByIdAndUpdate(id, userData);
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    const User = (await import("@/models/User")).default;

    await connectDb();
    await User.findByIdAndDelete(id);
  }
);

export const createUserOrder = inngest.createFunction(
  {
    id: 'create-user-order',
    batchEvents: {
      maxSize: 5,
      timeout: '5s'
    }
  },
  { event: 'order/created' },
  async ({ events }) => {
    await connectDb();

    // Use Promise.all with Order.create for proper validation and type conversion
    const orderPromises = events.map((event) => 
      Order.create({
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address, // ← Mongoose auto-converts to ObjectId
        date: event.data.date
      })
    );

    const createdOrders = await Promise.all(orderPromises);

    return { success: true, processed: createdOrders.length };
  }
);

