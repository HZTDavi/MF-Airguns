import './globals.css'

export const metadata = {
    title: 'MF Airguns',
    description: 'Sua loja especializada em Airguns',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    )
}
