import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  autoConnectWallet,
  getAddress,
  loadProvider,
  switchToRightNetwork,
} from "../utils/script";
import { WalletDetails } from "../utils/type";
import { ethers } from "ethers";
import { networks } from "../utils/constants";

// Define the shape of the context state
interface AccountContextState {
  wallet: WalletDetails | null;
  provider: any;
  address: string | null;
  updateAddress: (address: string) => void;
  updateWallet: (wallet: WalletDetails) => void;
}

// Define the props for the provider component
interface AccountProviderProps {
  children: ReactNode;
}

// set default state of the context state
export const AccountContext = createContext<AccountContextState>({
  wallet: null,
  address: null,
  provider: null,
  updateAddress: (_a: string) => {},
  updateWallet(wallet) {},
});

// The UserProvider component that wraps its children components in a UserContext Provider,
// allowing descendant components to subscribe to updates from the user object
export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<WalletDetails | null>(null);

  let account = { provider, address, wallet };

  const fetchData = async () => {
    const provider = await loadProvider();
    const address = await autoConnectWallet();

    setProvider(provider);
    setAddress(address ? address : null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      localStorage.setItem("connectedAccount", accounts[0]);
      setAddress(accounts[0]);
    });
    window.ethereum.on("chainChanged", async (chainId: any) => {
      const chainIdsInHex = networks.map((n) => ethers.toBeHex(n.chainId));
      if (!chainIdsInHex.includes(chainId)) {
        const prompt = window.confirm(
          "Wrong Network! Click Okay to switch to Asset Chain?"
        );
        if (prompt) {
          try {
            const accounts = await switchToRightNetwork();
            setAddress(accounts.length > 0 ? accounts[0] : null);
          } catch (error) {}
        }
      } else {
        const _chainId = parseInt(chainId, 16)
        const provider = await loadProvider();
        const address = await autoConnectWallet(_chainId);
        setProvider(provider)
        setAddress(address ? address : null);
      }
    });
  }, []);

  return (
    <AccountContext.Provider
      value={{
        ...account,
        updateAddress(address) {
          setAddress(address);
        },
        updateWallet(wallet) {
          setWallet(wallet);
        },
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// this hook provides an easy way for descendant components to access the user data stored in the UserContext
export const useAccount = (): AccountContextState | undefined =>
  useContext(AccountContext);
