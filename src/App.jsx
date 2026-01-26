import Header from './components/Header'
import Hero from './components/Hero'
import ProductHero from './components/ProductHero'
import { IPHONE_16_PRO } from './assets/data/products'

function App() {
  return (
    <div
      className="bg-apple-light text-apple-dark
      dark:bg-apple-dark dark:text-apple-light
      min-h-screen">
      <Header />
      <Hero />
      <ProductHero product={IPHONE_16_PRO}></ProductHero>
    </div>
  )
}

export default App
