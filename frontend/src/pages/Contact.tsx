import Layout from "components/Layout/Layout";
import Subscribe from "components/Sections/Subscribe"
import ContactForm from "components/forms/ContactForm";

const Contact: React.FC = () => {
    return (
        <>
            <Layout>
                <ContactForm />
                <Subscribe />
            </Layout>
        </>
    )
}

export default Contact;