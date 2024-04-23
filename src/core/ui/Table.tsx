import * as React from 'react';
import { useState, useEffect} from 'react';
import cn from 'clsx';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b border-gray-50 dark:border-dark-800',
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'font-medium w-full [&_tr:first-child]:border-b-0' +
        ' [&_tr:first-child]:border-t',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-gray-50 dark:border-dark-800 transition-colors hover:bg-muted/50' +
        ' data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-2 text-left align-middle font-medium text-muted-foreground' +
        ' [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-2.5 py-4 align-middle [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

// const EditableCell = React.forwardRef<
//   HTMLTableCellElement,
//   React.TdHTMLAttributes<HTMLTableCellElement> & {
//     editable?: boolean;
//     value?: string;
//     onChange?: (value: string) => void;
//     moveToNextCell?: (id: number) => void;
//     id?: number;
//   }
// >(({ className, editable, value, onChange, moveToNextCell, id, ...props }, ref) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentValue, setCurrentValue] = useState(value);

//   useEffect(() => {
//     setCurrentValue(value);
//   }, [value]);

//   // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
//   //   if (e.key === 'Enter') {
//   //     e.preventDefault();
//   //     // Invoke moveToNextCell if defined
//   //     props.moveToNextCell?.(id);
//   //   }
//   // };
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       setIsEditing(false); // End editing on Enter key
//       if (moveToNextCell && id !== undefined) {
//         moveToNextCell(id); // Call the function to move the focus
//       }
//     }
//   };

//   // const handleBlur = () => {
//   //   setIsEditing(false);
//   //   if (onChange) {
//   //     onChange(currentValue);
//   //   }
//   // };
//   const handleBlur = () => {
//   setIsEditing(false);
//   if (onChange && currentValue !== undefined) {
//     onChange(currentValue);
//   }
// };

//   return (
//     <td
//       ref={ref}
//       className={cn(
//         'px-2.5 py-4 align-middle [&:has([role=checkbox])]:pr-0',
//         className,
//       )}
//       onClick={() => editable && setIsEditing(true)}
//       {...props}
//     >
//       {isEditing ? (
//         <input
//           type="text"
//           className="w-full"
//           value={currentValue}
//           onChange={(e) => setCurrentValue(e.target.value)}
//           moveToNextCell={(e) => setCurrentValue(e.target.value)}
//           onBlur={handleBlur}
//           autoFocus
//           data-id={id}
//           onKeyDown={handleKeyDown}
//         />
//       ) : (
//         value
//       )}
//     </td>
//   );
// });

// EditableCell.displayName = 'EditableCell';

// interface EditableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
//   editable: boolean;
//   value: string;
//   onChange: (id: number, value: string) => void;
//   onEnter: (id: number) => void;
//   isEditing: boolean;
//   id: number;
//   makeCellEditable: (id: number) => void;
// }


// const EditableCell = React.forwardRef<HTMLTableCellElement, EditableCellProps>(
//   ({ editable, value, onChange, onEnter, isEditing, id, className, makeCellEditable, ...props }, ref) => {
//     const [currentValue, setCurrentValue] = useState(value);
//     const inputRef = React.useRef<HTMLInputElement>(null);

//     useEffect(() => {
//       setCurrentValue(value);
//     }, [value]);

//     useEffect(() => {
//       if (isEditing && inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, [isEditing]);

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         onEnter(id);
//       }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setCurrentValue(e.target.value);
//     };

//     const handleBlur = () => {
//       onChange(id, currentValue);
//     };

//     return (
//       <td onClick={() => makeCellEditable(id)}
//       ref={ref}
//       className={cn(
//         'px-2.5 py-4 align-middle [&:has([role=checkbox])]:pr-0',
//         className,
//       )}
      
//        {...props}>
//         {isEditing ? (
//           <input
//             ref={inputRef}
//             type="text"
//             value={currentValue}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             onBlur={handleBlur}
//             autoFocus
//           />
//         ) : (
//           <div onClick={() => editable && onEnter(id)}>{value}</div>
//         )}
//       </td>
//     );
//   }
// );

// EditableCell.displayName = 'EditableCell';

interface EditableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  editable: boolean;
  value: string;
  onChange: (id: number, value: string) => void;
  onEnter: (id: number) => void;
  isEditing: boolean;
  id: number;
  makeCellEditable: (id: number) => void; // Corrected type
}

// const EditableCell = React.forwardRef<HTMLTableCellElement, EditableCellProps>(
//   ({ editable, value, onChange, onEnter, isEditing, id, className, makeCellEditable, ...props }, ref) => {
//     const [currentValue, setCurrentValue] = useState(value);
//     const inputRef = React.useRef<HTMLInputElement>(null);

//     useEffect(() => {
//       setCurrentValue(value);
//     }, [value]);

//     useEffect(() => {
//       if (isEditing && inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, [isEditing]);

//     // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     //   if (e.key === 'Enter') {
//     //     e.preventDefault();
//     //     onEnter(id);
//     //     // onChange(id, currentValue);
//     //   }
//     // };
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         e.stopPropagation(); // Prevents the event from propagating further.
//         onChange(id, currentValue); // Ensure changes are committed.
//         onEnter(id); // Moves focus to the next cell.
//       }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setCurrentValue(e.target.value);
//     };

//     const handleBlur = () => {
//       onChange(id, currentValue);
//     };

//     return (
//       <td 
//         ref={ref} 
//         className={cn('px-2.5 py-4 align-middle', className)} 
//         onClick={() => editable && makeCellEditable(id)} {...props}>
//         {isEditing ? (
//           <input
//             ref={inputRef}
//             type="text"
//             value={currentValue}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             // onBlur={handleBlur}
//             autoFocus
//             onClick={(e) => e.stopPropagation()} // Prevent click event propagation
//           />
//         ) : (
//           <div>{value}</div>
//         )}
//       </td>
//     );
//   }
// );

// EditableCell.displayName = 'EditableCell';

const EditableCell = React.forwardRef<HTMLTableCellElement, EditableCellProps>(
  ({ editable, value, onChange, onEnter, isEditing, id, className, makeCellEditable, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Update the local state when the value prop changes
    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation(); // Stop the event from propagating further

        // Commit the current value immediately when Enter is pressed
        onChange(id, currentValue);
        onEnter(id); // Proceed to make the next cell editable or whatever your logic is

        // Optionally, if your logic requires the input to lose focus, you can do:
        // inputRef.current?.blur();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
    };

    // The handleBlur function is retained for scenarios where the user clicks away or finishes editing.
    const handleBlur = () => {
      onChange(id, currentValue);
    };

    return (
      <td 
        onClick={() => editable && makeCellEditable(id)} 
        ref={ref} 
        className={cn('px-2.5 py-4 align-middle', className)} 
        {...props}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            onClick={(e) => e.stopPropagation()} // Prevent the td's onClick from firing when the input is clicked
          />
        ) : (
          <div>{currentValue}</div> // Make sure to use currentValue here to reflect the immediate change
        )}
      </td>
    );
  }
);

EditableCell.displayName = 'EditableCell';


const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  EditableCell,
  TableCaption,
};
