import React from 'react'
import { useState } from 'react';

export default function Email() {
    const [value,setValue] = useState("");
    const Imap = require('node-imap');
    const { simpleParser } = require('mailparser');
    
    const imapConfig = {
      user: 'your-email@gmail.com',
      password: 'your-email-password',
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    };
    
    const imap = new Imap(imapConfig);
    
    const openInbox = (cb) => {
      imap.openBox('INBOX', true, cb);
    };
    
    imap.once('ready', () => {
      openInbox((err, box) => {
        if (err) throw err;
        imap.search(['UNSEEN', ['SINCE', 'May 20, 2020']], (err, results) => {
          if (err) throw err;
          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg, seqno) => {
            msg.on('body', (stream, info) => {
              simpleParser(stream, async (err, parsed) => {
                if (err) throw err;
                setValue(parsed.subject);
                console.log('Subject:', parsed.subject);
                console.log('From:', parsed.from.text);
                console.log('Body:', parsed.text);
                // Do something with the email message, e.g., save to database
              });
            });
            msg.once('attributes', (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ['\\Seen'], (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Marked as read!');
                }
              });
            });
          });
          f.once('error', (err) => {
            console.log('Fetch error: ' + err);
          });
          f.once('end', () => {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
      });
    });
    
    imap.once('error', (err) => {
      console.log(err);
    });
    
    imap.once('end', () => {
      console.log('Connection ended');
    });
    
    imap.connect();
   return (
    <div>
       <p>{value}</p>
    </div>
  )
}
