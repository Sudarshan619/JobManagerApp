// src/components/DnsRecord.js
import React from 'react';

const DnsRecord = ({ record }) => (
  <div>
    <p>Record Type: {record.type}</p>
    <p>Value: {record.value}</p>
    {/* Add more fields as needed */}
  </div>
);

export default DnsRecord;
