import axios from 'axios';
import { useState } from 'react';

const FileUpload = ({ state, account }) => {
  const { contract } = state;
  const { provider } = state;

  const [file, setfile] = useState(null);
  const [fileName, setfileName] = useState('No Image Select');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `531a3dd96601eb22ced9`,
            pinata_secret_api_key: `2da1612533f5e773aca912c575bb0f1ea44ef384ddce35a7ee6e2e20512a8882`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const ImageHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImageHash);
        alert('File is Upload');
      } catch (error) {
        alert('File is not Upload');
      }
    }
    setfile(null);
    setfileName('No Image');
  };
  const receivingData = async (e) => {
    const Data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(Data);
    reader.onloadend = () => {
      setfile(e.target.files[0]);
    };
    setfileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit} method="post">
        <input
          type="file"
          name="data"
          id="file-upload"
          onChange={receivingData}
          disabled={!account}
        />

        <button
          type="submit"
          className="btn btn-danger"
          disabled={!file || !state.contract}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default FileUpload;
