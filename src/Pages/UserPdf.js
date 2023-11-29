import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import Template from '../PDF/Template';
import PDFFile from '../PDF/PDFFile';

const UserPdf = () => {
  const downloadpdf = () => {
    console.log('pdf')
  }
  return (
    <div className='m-20'>
      <PDFDownloadLink
        document={<PDFFile></PDFFile>}
        fileName='FORM'
      >
        {({loading}) => (loading? <button>Loading document...</button> : 
                                  <button>Download</button>)}
      </PDFDownloadLink>
      <PDFFile></PDFFile>
    </div>
  );
};

export default UserPdf;