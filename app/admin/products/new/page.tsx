'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'ARMAS',
        description: '',
        features: ''
    });

    // Estado para armazenar os arquivos reais
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    // Estado para armazenar URLs de preview
    const [previews, setPreviews] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            // Adiciona aos arquivos existentes
            setSelectedFiles(prev => [...prev, ...newFiles]);

            // Gera previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            // Revoga a URL para liberar memória
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('features', formData.features);

            // Anexa todas as imagens
            selectedFiles.forEach((file) => {
                data.append('images', file);
            });

            const res = await fetch('/api/admin/products', {
                method: 'POST',
                body: data, // Não precisa de Content-Type header com FormData
            });

            if (res.ok) {
                alert("Produto criado com sucesso!");
                router.push('/admin/dashboard');
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Erro: ${error.error || 'Falha ao salvar'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão ao salvar produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <Link href="/admin/dashboard" className="btn-back">
                ← Voltar ao Painel
            </Link>

            <header className="dashboard-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 20 }}>
                <h1 className="admin-title">Novo Produto (Com Upload)</h1>
            </header>

            <div className="form-container">
                <form onSubmit={handleSubmit}>

                    {/* Nome */}
                    <div className="form-group">
                        <label className="form-label">Nome do Produto</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Ex: Carabina PCP Beeman"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Preço */}
                        <div className="form-group">
                            <label className="form-label">Preço (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                className="form-input"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Categoria */}
                        <div className="form-group">
                            <label className="form-label">Categoria</label>
                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="ARMAS">ARMAS</option>
                                <option value="ACESSORIOS">ACESSÓRIOS</option>
                            </select>
                        </div>
                    </div>

                    {/* Upload de Imagens */}
                    <div className="form-group">
                        <label className="form-label">Galeria de Fotos</label>

                        {/* Input escondido, acionado pelo clique na área */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            multiple
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        <div
                            className="upload-area"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <span>📁 Clique para selecionar fotos do seu computador</span>
                        </div>

                        {/* Preview das imagens */}
                        {previews.length > 0 && (
                            <div className="preview-grid">
                                {previews.map((src, index) => (
                                    <div key={index} className="preview-item">
                                        <img src={src} className="preview-img" alt="Preview" />
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={() => removeImage(index)}
                                            title="Remover foto"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Descrição */}
                    <div className="form-group">
                        <label className="form-label">Descrição Detalhada</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Texto explicativo sobre o produto..."
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Características */}
                    <div className="form-group">
                        <label className="form-label">Características Técnicas</label>
                        <textarea
                            name="features"
                            className="form-textarea"
                            placeholder="- Calibre: 5.5mm&#10;- Peso: 3kg&#10;- Material: Polímero"
                            value={formData.features}
                            onChange={handleChange}
                            style={{ minHeight: '80px' }}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? 'Enviando Arquivos...' : '💾 Salvar Produto'}
                    </button>

                </form>
            </div>
        </div>
    );
}
