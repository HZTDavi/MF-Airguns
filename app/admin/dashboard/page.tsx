import { prisma } from '@/lib/db';
import ProductList from './ProductList';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            images: {
                take: 1
            }
        }
    });

    // Prisma retorna Decimals e Dates que precisam ser serializados para passar pro Client Component
    const serializedProducts = products.map(p => ({
        ...p,
        price: p.price.toString(),
        createdAt: p.createdAt.toISOString()
    }));

    return <ProductList products={serializedProducts} />;
}
