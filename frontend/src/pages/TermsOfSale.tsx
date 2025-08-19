import Layout from "components/Layout/Layout";
import TermsOfSaleText from "components/Terms/TermsOfSaleText";
import Subscribe from "components/Sections/Subscribe"

const TermsOfSale = () => {
    return (
        <>
            <Layout>
                <TermsOfSaleText />
                <Subscribe />
            </Layout>
        </>
    )
}

export default TermsOfSale;