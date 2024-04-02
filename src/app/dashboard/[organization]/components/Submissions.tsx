'use client';

// import { Line, ResponsiveContainer, LineChart, XAxis } from 'recharts';
// import { useMemo } from 'react';

// import Tile from '~/core/ui/Tile';
// import Heading from '~/core/ui/Heading';
// import useUserSession from '~/core/hooks/use-user-session';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '~/core/ui/Table';
// import Textarea from '~/core/ui/Textarea';
// import TextField from '~/core/ui/TextField';
// import InputFile from '~/core/ui/InputFile';

// export default function Submissions() {
//   const mrr = useMemo(() => generateDemoData(), []);
//   const visitors = useMemo(() => generateDemoData(), []);
//   const returningVisitors = useMemo(() => generateDemoData(), []);
//   const churn = useMemo(() => generateDemoData(), []);
//   const netRevenue = useMemo(() => generateDemoData(), []);
//   const fees = useMemo(() => generateDemoData(), []);
//   const newCustomers = useMemo(() => generateDemoData(), []);
//   const tickets = useMemo(() => generateDemoData(), []);
//   const activeUsers = useMemo(() => generateDemoData(), []);

//   return (
//     <div className={'flex flex-col space-y-6 pb-36'}>
//       <div
//         className={
//           'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' +
//           ' 2xl:grid-cols-4'
//         }
//       >
        

//         <TextField>
//           <TextField.Label> Paste Your Apollo API Key Here</TextField.Label>
//           <TextField.Input
//             type = "text" 
//           />
            
//         </TextField>

//         {/* <InputFile>
        
//         </InputFile> */}

        
//       </div>

     
//     </div>
//   );
// }

// function generateDemoData() {
//   const today = new Date();
//   const formatter = new Intl.DateTimeFormat('en-us', {
//     month: 'long',
//     year: '2-digit',
//   });

//   const data: { value: string; name: string }[] = [];

//   for (let n = 8; n > 0; n -= 1) {
//     const date = new Date(today.getFullYear(), today.getMonth() - n, 1);

//     data.push({
//       name: formatter.format(date) as string,
//       value: (Math.random() * 10).toFixed(1),
//     });
//   }

//   return [data, data[data.length - 1].value] as [typeof data, string];
// }

// function Chart(
//   props: React.PropsWithChildren<{ data: { value: string; name: string }[] }>,
// ) {
//   return (
//     <div className={'h-36'}>
//       <ResponsiveContainer width={'100%'} height={'100%'}>
//         <LineChart width={400} height={100} data={props.data}>
//           <Line
//             className={'text-primary'}
//             type="monotone"
//             dataKey="value"
//             stroke="currentColor"
//             strokeWidth={2.5}
//             dot={false}
//           />

//           <XAxis
//             style={{ fontSize: 9 }}
//             axisLine={false}
//             tickSize={0}
//             dataKey="name"
//             height={15}
//             dy={10}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// function CustomersTable() {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Customer</TableHead>
//           <TableHead>Plan</TableHead>
//           <TableHead>MRR</TableHead>
//           <TableHead>Logins</TableHead>
//           <TableHead>Status</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         <TableRow>
//           <TableCell>Pippin Oddo</TableCell>
//           <TableCell>Pro</TableCell>
//           <TableCell>$100.2</TableCell>
//           <TableCell>920</TableCell>
//           <TableCell>
//             <Tile.Badge trend={'up'}>Healthy</Tile.Badge>
//           </TableCell>
//         </TableRow>

//         <TableRow>
//           <TableCell>Väinö Pánfilo</TableCell>
//           <TableCell>Basic</TableCell>
//           <TableCell>$40.6</TableCell>
//           <TableCell>300</TableCell>
//           <TableCell>
//             <Tile.Badge trend={'stale'}>Possible Churn</Tile.Badge>
//           </TableCell>
//         </TableRow>

//         <TableRow>
//           <TableCell>Giorgos Quinten</TableCell>
//           <TableCell>Pro</TableCell>
//           <TableCell>$2004.3</TableCell>
//           <TableCell>1000</TableCell>
//           <TableCell>
//             <Tile.Badge trend={'up'}>Healthy</Tile.Badge>
//           </TableCell>
//         </TableRow>

//         <TableRow>
//           <TableCell>Adhelm Otis</TableCell>
//           <TableCell>Basic</TableCell>
//           <TableCell>$0</TableCell>
//           <TableCell>10</TableCell>
//           <TableCell>
//             <Tile.Badge trend={'down'}>Churned</Tile.Badge>
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// }

import { useState, useEffect} from 'react';
import InputFile from '~/core/ui/InputFile';
import Button from '~/core/ui/Button'; 
import TextField from '~/core/ui/TextField';
import TagInput from '~/core/ui/TagInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';
import Tile from '~/core/ui/Tile';

export default function Submissions() {

  interface Person {
    id: string;
    Company: string;
    Name: string;
    Email: string;
    Linkedin: string;
    Title: string;
    Status: string; // assuming this should match the 'Email Status' or similar
  }

  interface Inputs {
    id: number;
    Domain: string;
  }


  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [tableData, setTableData] = useState<Person[]>([]);
  
  const [tags, setTags] = useState([])

  

  // Load API key from localStorage if it exists
  useEffect(() => {
    const storedValue = window.localStorage.getItem('apiKey');
    if (storedValue) {
      setApiKey(storedValue);
      console.log(apiKey)
    }
  }, []);
  
  // Save to localStorage whenever apiKey changes 
  useEffect(() => {
    window.localStorage.setItem('apiKey', apiKey);
  }, [apiKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // call API with file, API key and any other params
    e.preventDefault()
    console.log(apiKey)
    if(!file) {
      alert("Please select file to upload")
      return; 
    }

    const formData = new FormData();

  
    // formData.append('api_key', apiKey)
    formData.append('api_key', apiKey);
    formData.append('file', file)
    
    tags.forEach(tag => {
      formData.append('tags', tag);
    });

    

    try {
      const response = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        // headers: {
        //   'X-API-KEY': apiKey, // Sending API key as a header
        // },
        body: formData,
        // Headers not needed for FormData; the browser sets it automatically
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
      
      const data = await response.json();
      console.log(data)
      
      setTableData(data); // Update the table data state with the received JSON
    } catch (error) {
      console.error('Error during submission:', error);
    }

    // display response data
  }

  return (
    <div className={'flex flex-col space-y-6 pb-36 '}>
         <div
         
           
         >

      
   
    <form onSubmit={handleSubmit}>

      <div className={'flex flex-col space-y-6 pb-8'}>
        <TagInput selected={tags} setSelected={setTags} />


      </div>

      
          {/* <TextField
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          /> */}
          
          {/* <TextField
            label="Paste Your Apollo API Key Here"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)} 
          /> */}

          

            <div className={'flex flex-col space-y-6 pb-6'}>
            <TextField>
              <TextField.Label> Paste Your Apollo API Key Here</TextField.Label>
              <TextField.Input
                type = "text"  
                value = {apiKey}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value)}
              />     
            </TextField>


            </div>
            
            <div className={'flex flex-col space-y-6 pb-6'}>
              <InputFile onChange={handleFileChange} />
              
            </div>


          <Button type="submit">Submit</Button>
    </form>

    

    </div>
    <div className = {'flex flex-1 items-center w-full h-full justify-center flex-col space-y-4' +
        ' py-24'}>
        
      <Tile>
        <Tile.Heading> Contacts Table </Tile.Heading>

      <Tile.Body>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Company </TableHead>
            <TableHead> Name </TableHead>
            <TableHead> Email </TableHead>
            <TableHead> Linkedin </TableHead>
            <TableHead> Title </TableHead>
            <TableHead> Email Status </TableHead>
          </TableRow>
    

        </TableHeader>

        <TableBody>
          {tableData.length > 0 ? (
          tableData.map((person) => (
          <TableRow key={person.id}>
            <TableCell>{person.Company}</TableCell>
            <TableCell>{person.Name}</TableCell>
            <TableCell>{person.Email}</TableCell>
            <TableCell>{person.Linkedin}</TableCell>
            <TableCell>{person.Title}</TableCell>
            <TableCell>{person.Status}</TableCell>
          </TableRow>
          ))
          ) : (
          <tr>
          <em>No Data</em>
          </tr>
          )}
        </TableBody>


      </Table>
      </Tile.Body>




      </Tile>
      



      </div>
    
 
    </div>

    
  
     



   
    
    
  );

}