import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
