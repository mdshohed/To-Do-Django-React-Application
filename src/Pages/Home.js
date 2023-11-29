import axios from 'axios';
import React, { useEffect, useState, Fragment, useDebugValue } from 'react';
import swal from 'sweetalert';
import { Dialog, Transition } from '@headlessui/react'
import DataTable from 'react-data-table-component';
import Template from '../PDF/Template';

const Home = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState('');
  const [Dates, setDates] = useState('');
  const [view, setView] = useState(true);
  let newDate = new Date()
  let date = newDate.getDate();
  const numbers = [
    {
      product: 'dsdsd',
      amount: '23782'
    },
    {
      product: 'dsd',
      amount: '993'
    },
    {
      product: 'dssdffedfdsd',
      amount: '623'
    }
  ]
  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    console.log(`Date is ${date}`);
    setDates(date)
  },[])
  const Create = () => {
    setView(false)
  }

  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  const [userDetails, setUserDetails] = useState({
    id: user.id,
    name:  [{firstname: '', lastname: ''}],
    email: '',
    address: '',
    number: ''
  });

  async function handleUpdate(e) {
    e.preventDefault();
    userDetails.name = fName + ' ' + lName;
    console.log(userDetails);
    axios.put(`http://localhost:8000/api/users/${userDetails.id}/`, userDetails).then(res=>{
      swal("User details Updated");
      e.target.reset(); 
    }).catch(e=>{
      swal("Server Error"); 
      console.log(e); 
    })
  }
  
  const column = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true
    },
    {
      name:"Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name:"Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name:"Address",
      selector: row => row.address,
      sortable: true
    },
    {
      name:"Number",
      selector: row => row.number,
      sortable: true
    },
    {
      name: "Action",
      cell: row => <button onClick={()=>handleUpdateUser(user.id)} type='button' className='mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Update</button>
    },{
      cell: row =>       <button onClick={()=>handleDeleteUser(user.id)} type='button' className='mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Delete</button>

    }
  ]
  useEffect(()=>{
    axios.get('http://localhost:8000/api/users')
      .then(res=>{
          setUser(res.data)
          setFilterUser(res.data)
        }).catch(err=>console.log(err))
  },[])
  const handleFilter = (e) =>{
    const newData = filterUser.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setUser(newData);
  }
  
  

  const handleUpdateUser = (id) =>{
    setIsOpen(true)
    const url = `http://localhost:8000/api/users/${id}/`; 
    axios.get(url)
    .then(res=>{
      const name = res.data.name.split(' ');
      setFname(name[0]);
      setLname(name[1]);
      setUserDetails({...userDetails, 
        id: id,
        name: res.data.name, 
        email: res.data.email,
        address: res.data.address,
        number: res.data.number
      });
    })
    .catch(err=>console.log(err)) 
  }

  const handleDeleteUser = (id) =>{
    const proceed = window.confirm('Are you sure you want to delete this Product'); 
    if(proceed) {
      const url = `http://localhost:8000/api/users/${id}/`;
      axios.delete(url)
      .then(res=>{  
        const remaining = user.filter(item=>item._id !== id);
        window.location.reload();
        swal('Successfully deleted'); 
        setUser(remaining); 
      })
    }
  }

  return (
    <>
      <div className='mx-20 my-10'>
        <div class="bg-gray-100 ">
          {/* <div>
            <input onChange={handleFilter} className='py-1 rounded' type="text" placeholder='Search...'></input>
          </div> */}
          <DataTable
          columns={column}
          data={user}
          className='text-left bg-gray-50 border-b-2 border-gray-200'
          actions={
            <>
              {
                view ?
                  <div className='containers' >
                    <div className="form">
                      <div className="inputs">
                        <input type="text" placeholder='Invoice Number' value={InvoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                      </div>
                      <div className="buttons">
                        <button onClick={Create} >Create ➡️ </button>
                      </div>
                    </div>
                  </div>
                  :
                  <Template InvoiceNumber={InvoiceNumber} date={Dates}  />
              }
            </>
            // <button className='mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Download</button>
          }
          subHeaderComponent={<input onChange={handleFilter} type="text" placeholder='Search here'></input>}
          subHeaderAlign='left'
          >
          </DataTable>
          {/* <table class=" text-left left w-full ">
            <thead className='text-left bg-gray-50 border-b-2 border-gray-200 '>
              <tr >
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Address</th>
                <th>User Number</th>
              </tr>
            </thead>
              {user.map((user,index)=>( 
                <tbody className='m-4'>
                  <tr className='bg-white-800  p-5 rounded-md shadow'>
                    <td className='text-sm text-gray-700 p-3'>{index+1}</td>
                    <td className='p-3'>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.number}</td>
                    <button onClick={()=>handleUpdateUser(user.id)} type='button' className='mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Update</button>
                    <button onClick={()=>handleDeleteUser(user.id)} type='button' className='mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Delete</button>
                  </tr>
                  </tbody>
                ))
              }
          </table> */}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-900"
                    >Add User
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="bg-white px-6 py-10 sm:py-10 lg:px-8">
      
                    <form onSubmit={handleUpdate} className="mx-auto mt-2 max-w-xl sm:mt-2">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="given-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Name
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="given-name"
                              id="given-name"
                              autoComplete="given-name"
                              value={fName}
                              onChange={(e) => setFname(e.target.value)}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Last name
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              value={lName}
                              onChange={(e) => setLname(e.target.value)}
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              autoComplete="email"
                              value={userDetails.email}
                              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="tel"
                              name="phone-number"
                              id="phone-number"
                              autoComplete="tel"
                              value={userDetails.number}
                              onChange={(e) => setUserDetails({...userDetails, number: e.target.value})}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                            Address
                          </label>
                          <div className="mt-2.5">
                            <textarea
                              name="address"
                              id="address"
                              rows={4}
                              value={userDetails.address}
                              onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={''}
                            />
                          </div>
                        </div>
                        
                        </div>
                        <div className="mt-10">
                          <button
                            type="submit"
                            onClick={closeModal}
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update User
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Home;