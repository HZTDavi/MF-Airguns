'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Sucesso - Redirecionar
                router.push('/admin/dashboard');
            } else {
                // Erro
                setError(data.error || 'Falha ao entrar');
            }
        } catch (err) {
            setError('Erro de conexão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4 text-[#e0e0e0]">
            <div className="max-w-md w-full bg-[#1E1E1E] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#333] overflow-hidden">

                {/* Header Tático */}
                <div className="bg-[#1a1a1a] p-6 border-b border-[#333] text-center">
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-[#C5A059]">
                        Acesso Restrito
                    </h1>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                        Área Administrativa MF Airguns
                    </p>
                </div>

                {/* Formulário */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {error && (
                            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                                Identificação (Login)
                            </label>
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                className="w-full bg-[#121212] border border-[#333] text-white p-3 rounded focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                                placeholder="Ex: MFAirGuns"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                                Senha de Acesso
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#121212] border border-[#333] text-white p-3 rounded focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                                placeholder="••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#C5A059] hover:bg-[#b08d4b] text-black font-bold uppercase tracking-wide py-3 px-4 rounded transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
                        </button>
                    </form>
                </div>

                <div className="bg-[#151515] p-4 text-center text-xs text-gray-600 border-t border-[#333]">
                    &copy; MF Airguns - Sistema de Controle v1.0
                </div>

            </div>
        </div>
    );
}
