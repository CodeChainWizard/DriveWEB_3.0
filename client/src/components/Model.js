import { useEffect } from 'react';
import './Modal.css';

const Modal = ({ setmodal, state }) => {
  const { contract } = state;
  let address;
  const sharing = async (address) => {
    address = document.querySelector('.address').value;
    await contract.allow(address);
    alert('Access is Provide this Account');
    setmodal(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector('#selectNumber');
      const options = addressList;

      if (contract.disallow(address) === true) {
        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          let e1 = document.remove(opt);
          alert('Access is Not Sharing now to:- ', e1);
        }
      } else {
        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          let e1 = document.createElement('option');
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        }
      }
    };
    contract && accessList();
  }, [contract, address]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setmodal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing(address)}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
