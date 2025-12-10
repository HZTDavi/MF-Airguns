import Navbar from "@/app/components/Navbar";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-16 text-center md:text-left">
                <h1 className="text-4xl font-bold text-yellow-500 mb-6">M&F Air Guns</h1>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        Fundada com a missão de fornecer o que há de melhor no mundo do tiro esportivo,
                        a M&F Air Guns é especializada em equipamentos de alta precisão.
                    </p>
                    <p>
                        Trabalhamos com as marcas mais renomadas do mercado mundial, garantindo que nossos
                        clientes tenham em mãos tecnologia de ponta, performance e durabilidade.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-2">Missão</h3>
                            <p className="text-sm">Elevar o nível do esporte nacional com equipamentos premium.</p>
                        </div>
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-2">Contato</h3>
                            <p className="text-sm">contato@mfairguns.com.br</p>
                            <p className="text-sm">(11) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
