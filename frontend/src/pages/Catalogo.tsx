import Layout from "../components/Layout/Layout"
import Collections from "../components/Sections/Collections"
import Subscribe from "../components/Sections/Subscribe"

export default function Catalogo() {
  return (
    <>
      <Layout>
        <Collections/>
        <Subscribe />
      </Layout>
    </>
  )
}