"use client"
import Iconbank from '@/icon/iconbank';
import Button from '@/utils/Button';
import Contentheader from '@/utils/ContentHeader';
import Textfield from '@/utils/Textfield';
import MyModal from '@/utils/modal';
import React, { useEffect, useState } from 'react'
import Iconedit from '@/icon/iconedit';
import { toast } from 'react-toastify';
import { IBank, IFormCreateBank, IFormUpdateBank } from '@/interface/banktype';
import useApi from '@/services/api';
import Iconadd from '@/icon/iconadd';

export default function TableBank() {
  const [bankId, setBankId] = useState('');
  const [mybank, setMybank] = useState<IBank[]>([]);
  const [IsCreate, setIsCreate] = useState(false);
  const [IsUpdate, setIsUpdate] = useState(false);
  const [formCreateBank, setFormCreateBank] = useState<IFormCreateBank>({
    name: '',
    accountName: '',
    accountNumber: '',
  });
  const [formUpdateBank, setFormUpdateBank] = useState<IFormUpdateBank>({
    name: '',
    accountName: '',
    accountNumber: ''
  });
  const api = useApi();
  useEffect(() => {
    api({ url: 'banks/owner', method: 'get', params: {} }).then((res) => {
      if (res?.status === 200) {
        setMybank(res?.data);
      } else {
        console.log(res);
      }
    })
  }, [setMybank])

  const loadBank = () => {
    api({ url: 'banks/owner', method: 'get', params: {} }).then((res) => {
      if (res?.status === 200) {
        setMybank(res?.data);
      } else {
        console.log(res);
      }
    })
  }

  const handleCreate = () => {
    setIsCreate(!IsCreate);
  }

  const handleUpdate = () => {
    setIsUpdate(!IsUpdate);
  }
  const savechange = () => {
    toast.success('อัปเดตสำเร็จ');
  }

  const onkeyupCreate = (e: any) => {
    setFormCreateBank({ ...formCreateBank, [e.target.name]: e.target.value })
  }

  const handleSubmitCreate = (e: any) => {
    e.preventDefault();
    api({ url: 'banks', method: 'post', params: formCreateBank }).then((res) => {
      toast.success('สร้างสำเร็จ');
      loadBank();
      handleCreate();
    })
  }

  const onkeyupUpdate = (e: any) => {
    setFormUpdateBank({ ...formUpdateBank, [e.target.name]: e.target.value })
  }

  const getBankById = (id: string) => {
    api({ url: 'banks/' + id, method: 'get', params: {} }).then((res) => {
      setBankId(id);
      setFormUpdateBank(res.data);
    })
  }



  const handleSubmitUpdate = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    api({ url: 'banks/' + bankId, method: 'put', params: data }).then((res) => {
      if (res.status === 200) {
        toast.success('อัปเดตความสำเร็จ');
        handleUpdate();
        loadBank();
      } else {
        toast.error('บางสิ่งผิดปกติ');
      }
    })
  }

  return (
    <div>
      <div className="container mx-auto px-5 pt-[80px]">
        <Contentheader title='จัดการธนาคาร' link='/myinfo' />
        <div className='w-full flex justify-center py-10'>
          <button onClick={handleCreate} className='flex gap-2 btn btn-warning' ><Iconadd /> เพิ่มธนาคารใหม่</button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="w-full md:w-[450px]">
            {mybank.length > 0 && mybank.map((val, key) => (
              <div key={key} className='flex bg-info p-5 rounded cursor-pointer select-none gap-5 mb-5 shadow items-center relative' onClick={() => {
                handleUpdate(),
                  getBankById(val.bankId)
              }}>
                <div className='text-2xl  p-2 rounded'>
                  <Iconbank />
                </div>
                <div>
                  <div className='text-xl line-clamp-1'>{val.name}</div>
                  <div className='text-warning  line-clamp-1'>{val.accountName}</div>
                </div>
                <div className='absolute top-2 right-2 text-sm'><Iconedit /></div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal Create Bank */}
        <MyModal isOpen={IsCreate} onClose={handleCreate} className='lg:w-2/5'>
          <h3 className='font-bold'>สร้างข้อมูลธนาคาร</h3>
          <form onSubmit={handleSubmitCreate} className="grid grid-cols-1 gap-3 mt-5">
            <Textfield required id='name' name='name' onChange={onkeyupCreate} placeholder='กรอกชื่อธนาคาร' title='ชื่อธนาคาร' />
            <Textfield required id='accountName' name='accountName' onChange={onkeyupCreate} placeholder='กรอกชื่อบัญชี' title='ชื่อบัญชี' />
            <Textfield required id='accountNumber' name='accountNumber' onChange={onkeyupCreate} placeholder='กรอกเลขบัญชี' title='เลขบัญชี' />

            <div className="w-full flex justify-end gap-2">
              <Button type='button' title='ปิด' onClick={handleCreate} className='bg-danger text-white rounded mt-5 inline-block' />
              <Button type='submit' title='บันทึก' className='bg-yellow-500 text-white rounded mt-5 inline-block' />
            </div>
          </form>
        </MyModal>

        {/* Modal Update Bank */}
        <MyModal isOpen={IsUpdate} onClose={handleUpdate} className='lg:w-2/5'>
          <h3 className='font-bold'>อัปเดตข้อมูลธนาคาร</h3>
          <form onSubmit={handleSubmitUpdate} className="grid grid-cols-1 gap-3 mt-5">
            <Textfield required value={formUpdateBank.name} id='name' name='name' onChange={onkeyupUpdate} placeholder='กรอกชื่อธนาคาร' title='ชื่อธนาคาร' />
            <Textfield required value={formUpdateBank.accountName} id='accountName' name='accountName' onChange={onkeyupUpdate} placeholder='กรอกชื่อบัญชี' title='ชื่อบัญชี' />
            <Textfield required value={formUpdateBank.accountNumber} id='accountNumber' name='accountNumber' onChange={onkeyupUpdate} placeholder='กรอกเลขบัญชี' title='เลขบัญชี' />

            <div className="w-full flex justify-between">
              <Button type='button' title='ปิด' onClick={handleUpdate} className='bg-danger text-white rounded mt-5 inline-block' />
              <Button type='submit' title='บันทึก' className='bg-yellow-500 text-white rounded mt-5 inline-block' />
            </div>
          </form>
        </MyModal>
      </div>
    </div>
  )
}
