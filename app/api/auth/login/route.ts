import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { login, password } = await request.json();

        if (!login || !password) {
            return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
        }

        // 1. Buscar usuário
        const admin = await prisma.adminUser.findUnique({
            where: { login: login }
        });

        // 2. Se não existe, erro
        if (!admin) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        // 3. Verificar senha
        const senhaValida = await bcrypt.compare(password, admin.password);

        if (!senhaValida) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        // 4. Sucesso!
        // (Num app real, aqui definiríamos o Cookie/Session)
        return NextResponse.json({
            success: true,
            message: "Login autorizado",
            user: { id: admin.id, name: admin.name }
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
