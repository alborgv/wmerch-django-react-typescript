import { MerchProvider } from './MerchContext';

const AppProviders: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <MerchProvider>
        {children}
    </MerchProvider>
  );
};

export default AppProviders;
