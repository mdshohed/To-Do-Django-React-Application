// import { Dialog } from '@headlessui/react';
import React, { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
// import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import { Close } from '@mui/icons-material'

const Template = (props) => {
  const ref = useRef();
  const [openAirPopup, setOpenAirPopup] = useState(false)
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState(0);
  const [list, setList] = useState([]);

  const addData = () =>{
    list.push({
      product: item,
      amount: amount,
    })
  }
  let sum = 0;
  list.forEach(amount=>{
    sum += parseInt(amount.amount)
  })

  return (
    <>
      <div className="container" ref={ref} >
          <div className="container">
              <div className="row">
                  <div>
                      <div className="col-md-12">
                          <div className="row">
                              <div className="col-md-4 brcode">
                                  <Barcode 
                                  value={`4N${props.InvoiceNumber}UT`} 
                                  width={1} height={50} 
                                  displayValue={false} />
                              </div>
                              <div className="col-md-8 text-right bbc">
                                  <h4 style={{ color: '#325aa8' }}><strong>Company</strong></h4>
                                  <p>01880766300</p>
                                  <p>mdshohed@gmail.com</p>
                              </div>
                          </div>
                          <br />
                          <div className="row">
                              <div className="col-md-12 text-center">
                                  <h2 style={{ color: '#325aa8' }} >INVOICE</h2>
                                  <h5> Id: {props.InvoiceNumber}</h5>
                              </div>
                          </div>
                          <br/>
                          <div>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th><h5>Products</h5></th>
                                  <th><h5>Amount</h5></th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                    list.length?
                                    list.map((items, index) => {
                                        return (
                                            <tr key={index} >
                                                <td className="col-md-9">{items.product}</td>
                                                <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> ${items.amount}  </td>
                                            </tr>
                                        )
                                    }):null
                                  }
                                  <tr>
                                    <td className="text-right">
                                        <p>
                                            <strong>Total Amount: </strong>
                                        </p>
                                    
                                        <p>
                                            <strong>Payable Amount: </strong>
                                        </p>
                                    </td>
                                    <td>
                                      <p>
                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {sum}</strong>
                                      </p>
                                      <p>
                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {sum}</strong>
                                      </p>
                                    </td>
                                  </tr>
                                  <tr style={{ color: '#F81D2D' }}>
                                      <td className="text-right"><h4><strong>Total: </strong></h4></td>
                                      <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i>${sum} </strong></h4></td>
                                  </tr>
                              </tbody>
                            </table>
                          </div>
                          <div>
                              <div className="col-md-12">
                                  <p><b>Date :</b> {props.date} </p>
                                  <br />
                                  <p><b>Name</b></p>
                                  <p><b>Contact: 01880766300</b></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <ReactToPrint 
        trigger={() => <button>Print</button>} 
        content={() => ref.current} 
        documentTitle={`INVOICE ${props.InvoiceNumber}`}
      />


      {/* <Dialog open={openAirPopup} >
          <DialogTitle>
              <div className="title">
                  <div className="hed">New product</div>
                  <div className="icon-cross" onClick={() => setOpenAirPopup(false)} ><Close /></div>
              </div>
          </DialogTitle>
          <DialogContent>
              <div className="container">
                  <div className="forms">
                      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder='PR Name' />
                      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
                  </div>
                  <div className="buttons">
                      <button onClick={addData} >Add</button>
                  </div>
              </div>
          </DialogContent>
      </Dialog> */}

  </>

  );
};

export default Template;