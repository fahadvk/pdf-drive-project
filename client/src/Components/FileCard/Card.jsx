import { Text, Card, Image, Menu, Button, Modal } from '@mantine/core';
import { DotsVertical, Trash, Edit } from 'tabler-icons-react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { deleteFileApi, instance } from '../../Apis/UserApis';
import icon from '../../assets/482216.png';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';

export default function FileCard({ file, get, isAdmin }) {
  const [pdfopened, setOpened] = useState(false);
  const navigate = useNavigate();
  const deleteFile = async () => {
    const { data } = await deleteFileApi(file._id);
    console.log(data);
    if (data) {
      get();
    }
  };
  const api = 'http://localhost:3000';
  const getlink = async () => {
    // const link = instance.get(`/files/${file.filePath}`);
    // console.log('object', link);
    // return  (`${api}/files/${file.filePath}`
  };
  return (
    <Card className='mt-4 ' maw='200px'>
      <Card.Section>
        {!isAdmin && (
          <Menu trigger='hover' classNames='ml-4' position='right'>
            <Menu.Target>
              <DotsVertical className='ml-20' />
            </Menu.Target>
            <Menu.Dropdown className='ml-10'>
              <Menu.Label></Menu.Label>
              <Menu.Item onClick={deleteFile} icon={<Trash size={14} />}>
                delete
              </Menu.Item>
              {/* <Menu.Item icon={<Edit size={14} />}>Edit</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        )}

        <Image
          className='object-cover'
          width='120px'
          height='120px'
          src={icon}
          alt='sdl'
          onClick={() => getlink()}
        />
      </Card.Section>
      <Text size='sm' color='dimmed'>
        {file.fileName}
      </Text>
      <Modal opened={pdfopened} onClose={() => setOpened(false)}>
        {console.log(`${api}/files/${file.filePath}`)}
        <Document file={`${api}/files/${file.filePath}`}></Document>
      </Modal>
    </Card>
  );
}
