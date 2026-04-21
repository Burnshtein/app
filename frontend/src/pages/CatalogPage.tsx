// pages/CatalogPage.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../wigets/Header/Header'
import { ProductList } from '../wigets/ProductList'
import { productApi } from '../entities/product/api'
import { setProducts, setLoading, setError } from '../app/store/slices/productSlice'
import type { AppDispatch, RootState } from '../app/store'

export function CatalogPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, isLoading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const response = await productApi.getAll()
        dispatch(setProducts(response.data))
      } catch (err: any) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [dispatch])

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

// pages/CatalogPage/CatalogPage.tsx
return (
  <div>
    <Header />
    <div className="container">
      <h1 className="page-title">Каталог товаров</h1>
      <ProductList products={products} />
    </div>
  </div>
)
}