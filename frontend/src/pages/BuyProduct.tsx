import Layout from "components/Layout/Layout"
import Interest from "components/Sections/Interest"
import Product from "components/Sections/Product"
import Subscribe from "../components/Sections/Subscribe"

export default function BuyProduct() {
  return (
    <>
      <Layout>
        <Product />
        <Interest />
        <Subscribe />
      </Layout>
    </>
  )
}