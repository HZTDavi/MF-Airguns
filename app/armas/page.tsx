import Navbar from "@/app/components/Navbar";
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ArmasPage() {
    const products = await prisma.product.findMany({
        where: { active: true, category: 'ARMAS' },
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
                <h1 className="text-4xl font-bold mb-8 border-l-4 border-yellow-600 pl-4">Rifles & Carabinas</h1>

                {products.length === 0 ? (
                    <p>Nenhuma arma encontrada.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((weapon) => (
                            <div key={weapon.id} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-yellow-600 transition shadow-lg group">
                                <div className="h-48 bg-zinc-800 flex items-center justify-center text-zinc-600 overflow-hidden">
                                    <img
                                        src={weapon.images[0]?.url || 'https://via.placeholder.com/300'}
                                        alt={weapon.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-xs text-yellow-600 uppercase font-bold">{weapon.category}</span>
                                    <h3 className="text-lg font-bold truncate">{weapon.name}</h3>
                                    <p className="text-gray-400 mt-2">R$ {Number(weapon.price).toFixed(2)}</p>
                                    <a href={`/product/${weapon.id}`} className="block w-full mt-4 bg-zinc-800 hover:bg-yellow-600 hover:text-black text-white py-2 rounded transition font-medium text-center">
                                        Ver Detalhes
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
