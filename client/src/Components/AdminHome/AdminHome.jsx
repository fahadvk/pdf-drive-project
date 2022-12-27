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
  async function getAllFiles() {
    const { data } = await getAllFiles();
    dispatch(setfiles(data));
  }
  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <div className='flex w-full  flex-wrap gap-10 mt-8  bg-white'>

      {files.map((file) => {
        return <FileCard isAdmin file={file} />;
      })}
    </div>
  );
}
