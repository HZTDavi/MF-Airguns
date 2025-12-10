import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const price = formData.get('price') as string;
        const description = formData.get('description') as string;
        const features = formData.get('features') as string;
        const category = formData.get('category') as string;

        const imageFiles = formData.getAll('images') as File[];

        // Validação básica
        if (!name || !price || !category) {
            return NextResponse.json({ error: "Preencha os campos obrigatórios" }, { status: 400 });
        }

        // Processamento de Imagens
        const imageUrls: string[] = [];

        if (imageFiles && imageFiles.length > 0) {
            // Garante que o diretório de uploads existe
            const uploadDir = join(process.cwd(), 'public', 'uploads');
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                // Ignora erro se já existe
            }

            for (const file of imageFiles) {
                // Apenas processa se for um arquivo válido
                if (file.size > 0) {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    // Gera nome único: timestamp-nome-limpo
                    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
                    const fileName = `${Date.now()}-${safeName}`;
                    const filePath = join(uploadDir, fileName);

                    // Salva no disco
                    await writeFile(filePath, buffer);

                    // Adiciona caminho público
                    imageUrls.push(`/uploads/${fileName}`);
                }
            }
        }

        // Se nenhuma imagem foi enviada, podemos definir uma padrão ou deixar sem
        // Por enquanto, seguimos a lógica normal

        // Criação no Banco de Dados
        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                description: description || '',
                features: features || '',
                category,
                active: true,
                images: {
                    create: imageUrls.map(url => ({ url }))
                }
            }
        });

        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
    }
}
