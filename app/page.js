'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import {firestore} from '../firebase';
import {Box, Typography, Modal, Stack, TextField, Button} from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore"

// import { openai } from "openai"

export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if ((docSnap.exists())) {
      const {quantity} = docSnap.data()
      if (quantity == 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if ((docSnap.exists())) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateInventory()
  }, [])
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#f0e6f6', fontFamily: '"Cascadia Mono", monospace'
       }}
    >
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{ 
          width: '200px', 
          mb: 2, 
          bgcolor: '#E0BBE4', 
          color: '#4a235a', 
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#E4C1F9'
          }
        }}
      >
        Add new item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box 
          position="absolute" 
          top="30%" 
          left="35%" 
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="background.paper"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ backgroundColor: '#f0e6f6'}}
        >
          <Typography variant="h6" align="center">Add item</Typography>
          <Stack direction="row" spacing={2}>
            <TextField 
              variant="outlined" 
              fullWidth 
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
            />
            <Button 
              variant="contained" 
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              sx={{ 
                bgcolor: '#E0BBE4', 
                color: '#fff', 
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#E4C1F9'
                }
              }}
            >
              Add 
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box 
        width='800px' 
        sx={{ 
          bgcolor: '#E0BBE4', 
          p: 2,
          borderRadius: 2,
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ color: '#4a235a', mb: 2 }}>
          Inventory Items (੭｡╹▿╹｡)੭
        </Typography>
        <Stack direction="column" spacing={0} sx={{ width: '100%' }}>
          {inventory.map(({ name, quantity }) => (
            <Box 
              key={name} 
              sx={{ 
                width: '100%', 
                minHeight: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                bgcolor: '#f0e6f6', 
                borderRadius: 1,
                p: 1,
                '&:not(:last-child)': {
                  mb: '-1px' // Remove space between items
                }
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left', color: '#4a235a' }}>
                {name}
              </Typography>
              <Typography sx={{ flexGrow: 1, textAlign: 'left', color: '#4a235a' }}>
                {quantity}
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                sx={{ minWidth: '80px', 
                  height: '30px', 
                  fontSize: '0.75rem', 
                  textAlign: 'right', 
                  margin: '0 10px',
                  borderColor: '#4a235a', // Match the text color
                  color: '#4a235a', // Ensuring text color is also set if not already
                  '&:hover': {
                    backgroundColor: '#f3e5f5', // Lighter purple on hover
                    borderColor: '#c2185b' // Change border color on hover if desired
                  }}}
                onClick={() => removeItem(name)}
              >
                Remove
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                sx={{ minWidth: '80px', 
                  height: '30px', 
                  fontSize: '0.75rem', 
                  textAlign: 'right', 
                  margin: '0 10px',
                  borderColor: '#4a235a', // Match the text color
                  color: '#4a235a', // Ensuring text color is also set if not already
                  '&:hover': {
                    backgroundColor: '#f3e5f5', // Lighter purple on hover
                    borderColor: '#c2185b' // Change border color on hover if desired
                  }}}
                onClick={() => addItem(name)}
              >
                Add
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
  
  
}
