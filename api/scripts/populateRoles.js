const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    // Add roles
    await prisma.role.createMany({
        data: [
            { id: 1, name: 'Reader' },
            { id: 2, name: 'Creator' }
        ],
        skipDuplicates: true // Skip if the role already exists
    });

    // Add admin user
    const adminPassword = await bcrypt.hash('adminpassword', 10);
    await prisma.user.create({
        data: {
            username: 'admin',
            password: adminPassword,
            role: {
                connectOrCreate: {
                    where: { id: 2 },
                    create: { id: 2, name: 'Creator' }
                }
            }
        }
    });

    console.log('Roles and admin user added successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });