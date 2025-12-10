const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Começando o povoamento do banco (Seed)...")

    const senhaSegura = await bcrypt.hash("MfSandroM", 10)

    const admin = await prisma.adminUser.upsert({
        where: { login: 'MFAirGuns' },
        update: {},
        create: {
            login: 'MFAirGuns',
            password: senhaSegura,
            name: 'Sandro Admin',
        },
    })

    console.log(`👤 Admin criado: ${admin.login}`)

    const produtoTeste = await prisma.product.create({
        data: {
            name: "Carabina PCP Artemis M22",
            price: 3200.00,
            description: "Uma das melhores PCPs de entrada.",
            features: "- Calibre: 5.5mm\n- Velocidade: 290m/s",
            category: "ARMAS",
            images: {
                create: [
                    { url: "/images/artemis-m22-lado.jpg" },
                    { url: "/images/artemis-m22-frente.jpg" }
                ]
            }
        }
    })

    console.log(`🔫 Produto criado: ${produtoTeste.name}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
