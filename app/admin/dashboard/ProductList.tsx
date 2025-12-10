'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    active: boolean;
    images: { url: string }[];
}

export default function AdminDashboard({ products: initialProducts }: { products: any[] }) {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // Função para excluir
    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este produto? Esta ação é irreversível e apagará as fotos também.")) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Remove da lista localmente para ser rápido
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert("Erro ao excluir.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        }
    };

    // Função para alternar visibilidade (Ativo/Inativo)
    const toggleStatus = async (id: number, currentStatus: boolean) => {
        try {
            // Atualização otimista (muda na tela antes de confirmar no server)
            const newStatus = !currentStatus;
            setProducts(prev => prev.map(p =>
                p.id === id ? { ...p, active: newStatus } : p
            ));

            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: newStatus })
            });

            if (!res.ok) {
                // Se der erro, desfaz a mudança
                setProducts(prev => prev.map(p =>
                    p.id === id ? { ...p, active: currentStatus } : p
                ));
                alert("Erro ao atualizar status.");
            } else {
                router.refresh(); // Garante sincronia
            }
        } catch (error) {
            alert("Erro de conexão.");
        }
    };

    return (
        <div className="dashboard-container">
            {/* 1. Cabeçalho */}
            <header className="dashboard-header">
                <h1 className="admin-title">Painel Administrativo - MFAirGuns</h1>
                <Link href="/api/auth/logout" className="btn-logout">
                    Sair do Sistema
                </Link>
            </header>

            {/* 2. Ação Principal */}
            <div className="actions-bar">
                <Link href="/admin/products/new" className="btn-add">
                    <span>➕</span> Adicionar Novo Produto
                </Link>
            </div>

            {/* 3. Tabela de Produtos */}
            <div className="table-container">
                {products.length === 0 ? (
                    <div className="empty-state">
                        Nenhum produto cadastrado.
                    </div>
                ) : (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>Imagem</th>
                                <th>Nome do Produto</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ opacity: product.active ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                                    <td>
                                        <img
                                            src={product.images[0]?.url || 'https://via.placeholder.com/50'}
                                            alt={product.name}
                                            className="thumb-img"
                                        />
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                                    <td>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            background: '#333',
                                            padding: '2px 8px',
                                            borderRadius: '4px'
                                        }}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td style={{ color: '#C5A059', fontWeight: 'bold' }}>
                                        R$ {Number(product.price).toFixed(2)}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${product.active ? 'status-active' : 'status-inactive'}`}>
                                            {product.active ? 'ATIVO' : 'OCULTO'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>

                                            {/* Botão de Visibilidade */}
                                            <button
                                                onClick={() => toggleStatus(product.id, product.active)}
                                                className="btn-icon"
                                                title={product.active ? "Ocultar produto" : "Mostrar produto"}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                {product.active ? '👁️' : '🔒'}
                                            </button>

                                            {/* Botão de Excluir */}
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="btn-icon"
                                                title="Excluir produto"
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
