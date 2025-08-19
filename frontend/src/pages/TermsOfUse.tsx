import Layout from "components/Layout/Layout";
import TermsOfUseText from "components/Terms/TermsOfUseText";
import Subscribe from "components/Sections/Subscribe"

const TermsOfUse = () => {
    return (
        <>
            <Layout>
                <TermsOfUseText />
                <Subscribe />
            </Layout>
        </>
    )
}

export default TermsOfUse;