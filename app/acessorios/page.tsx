import Navbar from "@/app/components/Navbar";
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AcessoriosPage() {
    const products = await prisma.product.findMany({
        where: { active: true, category: 'ACESSORIOS' },
        include: {
            images: {
                take: 1
            }
        }
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 border-l-4 border-yellow-600 pl-4">Acessórios Táticos</h1>

                {products.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl mb-4">Nenhum acessório disponível no momento.</p>
                        <p>Volte em breve para conferir lunetas, bipés e muito mais.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div key={item.id} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-yellow-600 transition shadow-lg group">
                                <div className="h-48 bg-zinc-800 flex items-center justify-center text-zinc-600 overflow-hidden">
                                    <img
                                        src={item.images[0]?.url || 'https://via.placeholder.com/300?text=Sem+Foto'}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-xs text-yellow-600 uppercase font-bold">{item.category}</span>
                                    <h3 className="text-lg font-bold truncate">{item.name}</h3>
                                    <p className="text-gray-400 mt-2">R$ {Number(item.price).toFixed(2)}</p>
                                    <Link href={`/product/${item.id}`} className="block w-full mt-4 bg-zinc-800 hover:bg-yellow-600 hover:text-black text-white py-2 rounded transition font-medium text-center">
                                        Ver Detalhes
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
