import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Importa aquele arquivo de conexão que criamos

export async function GET(request: Request) {
    try {
        // 1. Pega os filtros da URL (Ex: /api/products?category=ARMAS)
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        // 2. Define a regra de busca
        const whereCondition = {
            active: true, // Só mostra produtos ativos
            ...(category && { category: category }), // Se tiver categoria na URL, filtra por ela
        };

        // 3. Busca no banco
        const products = await prisma.product.findMany({
            where: whereCondition,
            orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
            include: {
                images: {
                    take: 1 // TRUQUE DE PERFORMANCE: Pega só a 1ª foto para a capa (não carrega as 10)
                }
            }
        });

        // 4. Entrega os dados JSON
        return NextResponse.json(products);

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
