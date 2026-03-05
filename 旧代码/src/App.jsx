import Header from './components/Header'
import ProductHero from './components/ProductHero'
import { IPHONE_16_PRO } from './assets/data/products'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router-dom'
import {
  About,
  Computers,
  Entertainment,
  Home,
  Ipad,
  Phones,
  Register,
  SignIn,
  SmartHome,
  Support,
} from './pages'
import BlankLayout from './layouts/BlankLayout'

function App() {
  return (
    <div
      className="bg-apple-light text-apple-dark
      dark:bg-apple-dark dark:text-apple-light
      min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              header={<Header />}
              footer={<ProductHero product={IPHONE_16_PRO} />}></MainLayout>
          }>
          <Route path="/about" element={<About />} />
          <Route path="/computers" element={<Computers />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ipad" element={<Ipad />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/smarthome" element={<SmartHome />} />
          <Route path="/support" element={<Support />} />
        </Route>

        <Route path="/auth" element={<BlankLayout />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
