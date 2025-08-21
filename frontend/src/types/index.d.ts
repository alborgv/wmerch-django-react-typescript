export { };

declare global {

    interface RouteParams {
        [key: string]: string | undefined;
    }

    interface ProductImage {
        id: number;
        image: string;
        alt_text: string;
    }
    interface ProductType {
        id: number;
        name: string;
        description: string;
        price: string;
        images?: ProductImage[];
        stock: string;
    }

    interface ProductCardProps {
        id: string;
        image: string;
        name: string;
        price: string;
        width?: string;
        height?: string;
        size?: string;
    }


    interface ChildrenProps {
        children: ReactNode;
    }

    interface SubscriptionProps {
        email: string;
    }

    interface ContactFormProps {
        name: string;
        email: string;
        phone: string;
        message: string;
    }

    interface MerchType {
        getMerch: (id: string) => Promise<any>;
        getAllMerch: () => Promise<any>;
        sendContact: (formData: ContactFormProps) => Promise<any>;
        sendSubscription: (formData: SubscriptionProps) => Promise<any>;
        checkoutSession: (prod_id: string) => Promise<any>;
    }
}