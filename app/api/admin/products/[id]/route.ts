import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Next.js 15+ espera que params seja uma Promise ou requer React.use() em Client Components.
// Em Route Handlers (Back-end), 'params' vem direto, mas a tipagem correta é importante.

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Correção Crítica de Tipagem Next 15
) {
    try {
        // É necessário aguardar o params nas versões mais recentes em alguns contextos
        const { id } = await params;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        const body = await request.json();

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: { active: body.active }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Erro no PATCH:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        // Deletar imagens primeiro
        await prisma.productImage.deleteMany({
            where: { productId: productId }
        });

        // Deletar produto
        await prisma.product.delete({
            where: { id: productId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro no DELETE:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
