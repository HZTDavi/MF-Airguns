import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // 1. Hash da Senha
        const hashedPassword = await bcrypt.hash("MfSandroM", 10);

        // 2. Criar Admin
        const admin = await prisma.adminUser.upsert({
            where: { login: 'MFAirGuns' },
            update: {},
            create: {
                login: 'MFAirGuns',
                password: hashedPassword,
                name: 'Sandro Admin',
            },
        });

        // 3. Criar Produto
        const product = await prisma.product.create({
            data: {
                name: "Carabina PCP Artemis M22",
                price: 3200.00,
                description: "PCP de alta precisão para caça e esporte.",
                features: "Calibre 5.5mm - 290m/s",
                category: "ARMAS",
                images: {
                    create: [{ url: "https://placehold.co/600x400/png" }]
                }
            }
        });

        return NextResponse.json({ status: "SUCESSO", msg: "Admin e Produto criados!", admin: admin.login });

    } catch (error: any) {
        return NextResponse.json({ status: "ERRO", msg: error.message }, { status: 500 });
    }
}
