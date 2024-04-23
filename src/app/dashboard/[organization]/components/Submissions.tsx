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

import { useState, useEffect, useRef, createRef} from 'react';
import InputFile from '~/core/ui/InputFile';
import Button from '~/core/ui/Button'; 
import TextField from '~/core/ui/TextField';
import TagInput from '~/core/ui/TagInput';
import {
  Table,
  TableBody,
  TableCell,
  EditableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';
import {
  Tabs, 
  TabsList,
  TabsTrigger,
  TabsContent,
}
from '~/core/ui/Tabs';
import Tile from '~/core/ui/Tile';
import useIsSubscriptionActive from '~/lib/organizations/hooks/use-is-subscription-active';
import Label from '~/core/ui/Label';

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

  // interface Inputs {
  //   id: number;
  //   Domain: string;
  // }

  //EDITABLE INPUT TABLE
  interface EditableRow {
    id: number;
    content: string;
  }


  const [rows, setRows] = useState(Array.from({ length: 10 }, (_, index) => ({
    id: index,
    content: "",
    isEditing: index === 0 // Start with the first cell being editable for example
  })));
  

  

  // Adding rows to input table
  const addRows = () => {
    // Generate 10 new rows
    const newRows = Array.from({ length: 10 }, (_, index) => ({
      id: rows.length + index, // Ensure unique IDs for new rows
      content: ""
    }));
  
    setRows(currentRows => [
      ...currentRows,
      ...newRows // Add the new rows to the existing rows
    ]);
  };

  

  const handleCellChange = (id, newContent) => {
    // This function should update the content of the row with the specified ID
    setRows(rows.map(row => row.id === id ? {...row, content: newContent} : row));
  };
  
  const handleEnterPress = (id) => {
    // Find the index of the current row
    const currentIndex = rows.findIndex(row => row.id === id);
    // Set the next row as editable, and ensure the current row is no longer editable
    setRows(rows.map((row, index) => ({
      ...row,
      isEditing: index === currentIndex + 1
    })));
  };
  
  const makeCellEditable = (id) => {
    // Set the clicked cell as editable
    setRows(rows.map(row => ({
      ...row,
      isEditing: row.id === id
    })));
  };


 


  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// When rows change, update refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, rows.length);
  }, [rows]);

  const moveToNextCell = (currentId: number) => {
    const nextId = currentId + 1;
    const nextInputRef = inputRefs.current[nextId];
    if (nextInputRef) {
      nextInputRef.focus(); // Ensure this ref points to an input element
    } else {
      // Handle case where next cell is not focusable (e.g., last cell)
    }
  };

      
      
    
  const isSubscriptionActive = useIsSubscriptionActive();

  if (!isSubscriptionActive) {
   
    return (
      <div>
        <p>Your subscription is not active. Please visit the subscriptions page to sign up or renew your subscription.</p>
        {/* Link to the subscription page or render a modal */}
      </div>
    );
  }


  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [numberContacts, setNumberContacts] = useState(1)
  const [tableData, setTableData] = useState<Person[]>([]);
  const [inputMethod, setInputMethod] = useState('hermestable');
  
  const [tags, setTags] = useState([])

  const exportToCsv = (tableData) => {
    // Define CSV headers based on your tableData structure
    const headers = ['ID', 'Company', 'Name', 'Email', 'Linkedin', 'Title', 'Status'];
    
    // Convert table data to CSV rows
    const csvRows = tableData.map(row => 
      headers.map(fieldName => JSON.stringify(row[fieldName], (_, value) => value || '')).join(',')
    );
    
    // Add header row at the beginning
    csvRows.unshift(headers.join(','));
    
    // Combine all rows with new lines
    const csvString = csvRows.join('\n');
    
    // Convert CSV string to Blob
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    
    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  

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

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   // call API with file, API key and any other params
  //   e.preventDefault()
  //   console.log(apiKey)
  //   if(!file) {
  //     alert("Please select file to upload")
  //     return; 
  //   }

  //   const formData = new FormData();

  
  //   // formData.append('api_key', apiKey)
  //   formData.append('api_key', apiKey);
  //   formData.append('file', file)
    
  //   tags.forEach(tag => {
  //     formData.append('tags', tag);
  //   });

    

  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/search', {
  //       method: 'POST',
  //       // headers: {
  //       //   'X-API-KEY': apiKey, // Sending API key as a header
  //       // },
  //       body: formData,
  //       // Headers not needed for FormData; the browser sets it automatically
  //     });
  
  //     if (!response.ok) throw new Error('Network response was not ok.');
      
  //     const data = await response.json();
  //     console.log(data)
      
  //     setTableData(data); // Update the table data state with the received JSON
  //   } catch (error) {
  //     console.error('Error during submission:', error);
  //   }

  //   // display response data
  // }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      console.log("handle submit")

      if (inputMethod === 'hermestable') {
        // Convert editableRows data to CSV and submit
          // Step 1: Gather data
          console.log("he")
      const dataToConvertToCSV = rows.map(row => [row.content]);

      // Step 2: Convert data to CSV string
      const csvContent = dataToConvertToCSV.map(e => e.join(",")).join("\n");

      // Optionally, add a header row if needed
      const csvHeader = "Company\n"; // Adjust based on your columns
      const csvData = csvHeader + csvContent;

      console.log(csvData)

      // Convert CSV string to Blob for file creation
      const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

      // You can create a FormData object and append the file if your backend expects a form-data request
      formData.append("file", csvBlob, "inputData.csv");
      } else if (inputMethod === 'csv') {
        if (!file) {
          console.log("Here")
          alert("Please select a file to up.");
          return;
        }
        formData.append("file", file, "inputData.csv");


        
        
        
        // Submit the uploaded file
    }

   
  
   
    
    // Include other data as needed
    formData.append("api_key", apiKey);
    // If tags are supposed to be sent as well
    tags.forEach(tag => formData.append("tags", tag));
    console.log(formData)

    formData.append("num_contacts_per_company", numberContacts.toString());
  
    // Step 3: Send CSV data to your backend
    try {
      const response = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      const resultData = await response.json();
      console.log(resultData);
      setTableData(resultData); // Update table data state with response
      // Handle the response data as needed
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className={'flex flex-col space-y-6 pb-36 '}>
         <div
         
           
         >

      
   
    <form onSubmit={handleSubmit}>
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

            <div className={'flex flex-col space-y-6 pb-8'}>
              <TagInput selected={tags} setSelected={setTags} />


            </div>
                

            <div className={'flex flex-col space-y-6 pb-6'}>
            <TextField>
              <TextField.Label> Number of contacts you want per company</TextField.Label>
              <TextField.Input
                type = "number"
                value = {numberContacts}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumberContacts(event.target.value)}
              />     
            </TextField>     
           


            </div>
            
            


            {/* Tabs */}
            <Tabs defaultValue="account" className="w-full max-w-xl">
              <TabsList className="grid grid-cols-2 gap-5">
                {/* <TabsTrigger value="hermestable">Hermes Input Table</TabsTrigger> */}
                <TabsTrigger onClick={() => setInputMethod('hermestable')} value="hermestable">Hermes Input Table</TabsTrigger>
                <TabsTrigger onClick={() => setInputMethod('csv')} value="csv">Input CSV</TabsTrigger>
              </TabsList>
                <TabsContent value="hermestable">
                    <div className={'flex flex-col space-y-6'}>
                    <div>
                    <Button onClick={addRows}>Add 10 Rows</Button>
                    </div>

                    <div className="scrollable-table-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
                    <Tile>
                    <Tile.Heading> Input Table </Tile.Heading>
                    <Tile.Body> 

                    <Table>
                    <TableHeader>
                    <TableRow>
                    <TableHead> Company Domain (e.g. google.com - do not include https, www, or any other part of the URL here) </TableHead>
                    </TableRow>

                    </TableHeader>

                    <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                      

                        <EditableCell
                          key={row.id}
                          editable={true}
                          value={row.content}
                          onChange={handleCellChange}
                          onEnter={handleEnterPress}
                          isEditing={row.isEditing}
                          id={row.id}
                          makeCellEditable={makeCellEditable} 
                        />
                      
                      </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </Tile.Body>
                    </Tile>
                    </div>
                    </div>




                </TabsContent>

                <TabsContent value="csv">
                  <div className={'flex flex-col space-y-6 pb-6'}>
                  <Label> Input a csv file below in the following format:


                  </Label>
                  <InputFile onChange={handleFileChange} />

                  </div>

                </TabsContent>

              



              
            </Tabs>


        

            


          <Button type="submit">Submit</Button>
    </form>

    

    </div>


    

    <div className = {'flex flex-1 items-center w-full h-full justify-center flex-col space-y-4' +
        ' py-24'}>

      <Button onClick={() => exportToCsv(tableData)}>Export to CSV</Button>
        
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