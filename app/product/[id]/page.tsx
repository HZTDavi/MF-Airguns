import Navbar from "@/app/components/Navbar";
import ProductGallery from "@/app/components/ProductGallery";
import { prisma } from '@/lib/db';
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr"; // Vamos usar um icone de texto simples se não tiver lib, ou texto mesmo.
// Nota: O usuário não pediu lib de ícones específica para o whats, vou usar texto/emoji ou lucide se tiver.

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        select: { name: true }
    });

    return {
        title: product ? `${product.name} | MF Airguns` : 'Produto não encontrado',
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return <div>ID Inválido</div>;
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            images: true
        }
    });

    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
                    <a href="/" className="text-yellow-600 hover:underline">Voltar para a loja</a>
                </div>
            </div>
        );
    }

    // Formatar preço
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(product.price));

    // Link do WhatsApp (Exemplo genérico, substitua o numero depois)
    const whatsappNumber = "5511999999999";
    const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name}`);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Breadcrumb simples */}
                <div className="text-sm text-zinc-500 mb-8">
                    <a href="/" className="hover:text-yellow-600 transition">Home</a>
                    <span className="mx-2">/</span>
                    <a href={product.category === 'ARMAS' ? '/armas' : '/acessorios'} className="hover:text-yellow-600 transition">
                        {product.category === 'ARMAS' ? 'Armas' : 'Acessórios'}
                    </a>
                    <span className="mx-2">/</span>
                    <span className="text-zinc-300">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Coluna Esquerda: Galeria */}
                    <div className="w-full">
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Coluna Direita: Informações */}
                    <div className="flex flex-col h-full">
                        <span className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-2">
                            {product.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-4 mb-8 border-b border-zinc-800 pb-8">
                            <span className="text-4xl font-bold text-green-500">
                                {formattedPrice}
                            </span>
                            <span className="text-zinc-500 text-sm mb-2">à vista</span>
                        </div>

                        {/* Descrição */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-white mb-3">Sobre o Produto</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Características */}
                        <div className="mb-8 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                ⚙️ Especificações Técnicas
                            </h3>
                            <div className="text-zinc-300 leading-relaxed whitespace-pre-line font-mono text-sm">
                                {product.features}
                            </div>
                        </div>

                        {/* Botão de Ação */}
                        <div className="mt-auto">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-green-900/20"
                            >
                                <span>COMPRAR PELO WHATSAPP</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="transform group-hover:rotate-12 transition-transform">
                                    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l-9.8-14.69a8,8,0,0,0-.5-8l16-32a8,8,0,0,0-3-10.58l-32-21.33a8,8,0,0,0-10.45,2L46.65,65.75a48,48,0,0,0,6.07,61.76l61.77,61.77a48,48,0,0,0,61.76,6.07l27.14-30.54A8,8,0,0,0,187.58,144.84Z"></path>
                                </svg>
                            </a>
                            <p className="text-center text-zinc-600 text-xs mt-3">
                                * Atendimento personalizado para dúvidas e negociação.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
