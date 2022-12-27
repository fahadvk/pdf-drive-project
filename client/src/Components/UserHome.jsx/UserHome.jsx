import { Button, FileInput, Input, Modal, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

import { Upload } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFilesApi, UploadApi } from '../../Apis/UserApis';
import FileCard from '../FileCard/Card';
import { changeLoad } from '../../store/loaderSlice';
import { setfiles } from '../../store/FilesSlice';
export default function UserHome() {
  const uploadRef = useRef();
  const nameRef = useRef();
  const [opened, setOpened] = useState(false);
  // const [files, setFiles] = useState([]);
  const { files } = useSelector((state) => state.fileReducer);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const uploadFile = async () => {
    const formdata = new FormData();
    dispatch(changeLoad(true));
    formdata.append('file', file);
    formdata.append('name', nameRef.current.value);
    const { data } = await UploadApi(formdata);
    console.log(data);
    // setFiles([...files,data]);
    dispatch(setfiles([...files, data]));
    dispatch(changeLoad(false));
    setOpened(false);
  };
  async function getUserFiles() {
    const { data } = await getUserFilesApi();
    dispatch(setfiles(data));
  }
  useEffect(() => {
    getUserFiles();
  }, []);

  return (
    <div className='flex w-full  flex-wrap gap-10 mt-8  bg-white'>
      <div
        onClick={() => uploadRef.current.click()}
        className='extraOutline p-4 bg-white  bg-whtie  rounded-lg'
      >
        <div className='file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg'>
          <Upload size={60} strokeWidth={2.5} color={'black'} />
          <Text>Upload</Text>
          <input
            hidden
            type='file'
            accept='application/pdf'
            onChange={(e) => {
              setFile(e.target.files[0]);
              setOpened(true);
            }}
            ref={uploadRef}
          />
        </div>
      </div>
      <Modal
        opened={opened}
        centered
        onClose={() => {
          // uploadRef.current = '';
          setOpened(false);
        }}
        title='upload your file'
      >
        {/* {console.log(uploadRef.current.files[0])} */}
        <Input.Wrapper label='file Name' required>
          <Input placeholder='file Name' ref={nameRef} />
        </Input.Wrapper>
        <Input.Wrapper label='file'>
          <FileInput
            accept='application/pdf'
            onChange={(e) => setFile(e.target.files[0])}
            defaultValue={file}
            placeholder={file?.Name}
          />
        </Input.Wrapper>

        <Button
          onClick={uploadFile}
          className='bg-blue-500 mr-6 text-black mt-2'
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            uploadRef.current.files = '';
            setOpened(false);
          }}
          color='red'
          className='bg-red-500 outline-2 text-black mt-2'
        >
          Cancel
        </Button>
      </Modal>

      {files.map((file) => {
        return <FileCard get={getUserFiles}  file={file} />;
      })}
    </div>
  );
}
