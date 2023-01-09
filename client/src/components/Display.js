import { useState } from 'react';

const Display = ({ state, account }) => {
  const { contract } = state;
  const [data, setdata] = useState('');
  const getData = async (e) => {
    let dataArray;
    const Otherdata = document.getElementById('address').value;
    try {
      if (Otherdata) {
        dataArray = await contract.display(Otherdata);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      alert('You Have not a permission show Images😊.');
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(',');

      const image = str_array.map((item, i) => {
        return (
          <a href={item} key={i}>
            <img
              className="rounded mx-auto d-block mb-2 mt-5"
              width={300}
              height={300}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
            />
          </a>
        );
      });
      setdata(image);
    }
  };

  return (
    <>
      <div className="input-group flex-nowrap mt-5">
        <span className="input-group-text" id="addon-wrapping">
          Address
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          id="address"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
        <button type="submit" className="btn btn-danger" onClick={getData}>
          Get Data
        </button>
      </div>
      <h1 className="heading mt-2 text-success border-2 opacity-100">
        Display Images <hr />
      </h1>
      {data}
    </>
  );
};
export default Display;
