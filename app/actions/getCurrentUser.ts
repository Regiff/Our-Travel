import { getServerSession } from 'next-auth';
import { authConfig } from '@lib/auth';
import prisma from '@lib/prismadb';

export async function getSession() {
  const session = await getServerSession(authConfig);
  console.log('Session Data:', session); // Debugging;
  return session;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    console.log('Session Data:', session); // Log session data

    // Check if session is valid and contains required fields
    if (!session || !session.user || !session.user.id || !session.user.email) {
      console.warn('No valid user session found.');
      return null; // Return null if session is invalid
    }

    const { id, email, name = 'Unknown', image = null } = session.user;
    console.log('Session User Data:', { id, email, name, image });

    let currentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!currentUser) {
      console.warn('User not found, creating a new one...');
      currentUser = await prisma.user.create({
        data: { email, name, emailVerified: null, image },
      });
    }

    console.log('Current User:', currentUser);
    return currentUser;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return null;
  }
}
