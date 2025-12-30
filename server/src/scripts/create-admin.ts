
import 'dotenv/config';
import { auth } from '../lib/auth.js';

async function main() {
    console.log('Creating admin user...');
    try {
        const user = await auth.api.signUpEmail({
            body: {
                email: "admin@viza.ai",
                password: "password123",
                name: "Admin User"
            }
        });
        console.log('Admin user created successfully!');
        console.log('Email: admin@viza.ai');
        console.log('Password: password123');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

main();
