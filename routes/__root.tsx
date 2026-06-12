import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ShopProvider } from '@/context/ShopContext'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TrendWear Fashion — Discover Your Style' },
      {
        name: 'description',
        content:
          'TrendWear Fashion offers affordable and trendy clothing for everyone. Shop our latest collection of men, women, and activewear.',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="tw-body">
        <ShopProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ShopProvider>
        <Scripts />
      </body>
    </html>
  )
}
