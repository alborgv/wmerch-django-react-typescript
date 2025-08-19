import Layout from "components/Layout/Layout"
import BgInitial from "../components/Sections/BgInitial"
import CarouselHistory from "../components/Sections/CarouselHistory"
import Community from "../components/Sections/Community"
import Destacado from "../components/Sections/Destacado"
import Subscribe from "../components/Sections/Subscribe"

export default function Home() {
  return (
    <>
      <Layout>
        <BgInitial />
        <Destacado />
        <CarouselHistory />
        <Community />
        <Subscribe />
      </Layout>
    </>
  )
}