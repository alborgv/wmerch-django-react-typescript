import Layout from "components/Layout/Layout"
import BgInitial from "../components/Sections/BgInitial"
import CarouselHistory from "../components/Sections/CarouselHistory"
import Community from "../components/Sections/Community"
import Destacado from "../components/Sections/Destacado"
import Subscribe from "../components/Sections/Subscribe"
import FloatingButton from "@/components/ui/FloatingButton"

export default function Home() {
  return (
    <>
      <Layout>
        <BgInitial />
        <Destacado />
        <CarouselHistory />
        <Community />
        <Subscribe />
        <FloatingButton phoneNumber="573245990720"
          message="Hola! Me gustaría tener más información sobre los productos WMERCH"
        />
      </Layout>
    </>
  )
}