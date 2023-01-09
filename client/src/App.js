import './App.css';

import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Model from './components/Model';
import RemoveModal from './components/RemoveModal';

function App() {
  const [state, setstate] = useState({
    contract: null,
    provider: null,
    signer: null,
  });

  const [account, setAccount] = useState('None');
  const [modal, setmodal] = useState(false);
  const [removemodal, setRemovemodal] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setstate({ provider, signer, contract });
      } else {
        alert('Please install Metamask');
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        {!modal && (
          <button
            type="submit"
            className="btn btn-danger m-2"
            onClick={() => setmodal(true)}
          >
            Share Access
          </button>
        )}
        {modal && <Model state={state} setmodal={setmodal} />}

        {!removemodal && (
          <button
            type="submit"
            className="btn btn-danger m-2"
            onClick={() => setRemovemodal(true)}
          >
            Cancel Access
          </button>
        )}
        {removemodal && (
          <RemoveModal state={state} setRemovemodal={setRemovemodal} />
        )}
        <div className="App">
          <h1 className="MainHader">Drive WEB 3.0</h1>
          <p>
            <b>Connect Account: </b>
            {account}
          </p>
          <FileUpload state={state} account={account} />
          <Display state={state} account={account} />
        </div>
      </div>
    </>
  );
}

export default App;
