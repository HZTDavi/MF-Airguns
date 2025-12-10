import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        // Busca o produto pelo ID
        const product = await prisma.product.findUnique({
            where: { id: id },
            include: {
                images: true // AQUI SIM: Traz todas as 10 imagens para a galeria
            }
        });

        if (!product) {
            return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        }

        return NextResponse.json(product);

    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
    }
}
