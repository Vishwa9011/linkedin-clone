import React, { useState, useRef } from 'react'
import "./createpost.modules.css"
import { BsUpload } from "react-icons/bs";
import { Box, Button, Flex, FormControl, FormLabel, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { MdUpload } from "react-icons/md";
import { Input } from '@chakra-ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createPost } from '../../Redux/Post/post.actions';
import axios from 'axios';
import UseToastMsg, { ToastType } from '../../Custom-Hooks/Toast';
import { RootState } from '../../Redux/store';

function Createpost() {
   const { Toast } = UseToastMsg();
   const titleRef = useRef<HTMLInputElement>(null)
   const descRef = useRef<HTMLTextAreaElement>(null)
   const imageRef = useRef<HTMLInputElement>(null)
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [error, setError] = useState<boolean>(false)
   const dispatch: Dispatch<any> = useDispatch()
   const { userCredential } = useSelector((store: RootState) => store.auth)

   const onCreatePost = () => {

      if (!titleRef.current?.value || !descRef.current?.value || !imageRef.current?.files) {
         return setError(true)
      } else {
         setError(false)
      }

      const form = new FormData();
      form.append("file", imageRef.current!.files[0]);
      form.append("upload_preset", "sfunzr0m")
      form.append("cloud_name", "dpzbtnmfl")

      fetch("https://api.cloudinary.com/v1_1/dpzbtnmfl/image/upload", {
         method: "POST",
         body: form
      })
         .then((res) => res.json())
         .then(res => {
            const data = {
               title: titleRef.current!.value,
               description: descRef.current!.value,
               content: res.secure_url,
               author: userCredential._id,
               authorID: userCredential._id
            }
            console.log('data: ', data);
            dispatch(createPost(data))
         })
         .catch((err) => {
            console.log(err)
         })



   }

   return (
      <>
         <Flex p='2' my='5' gap='20px' justify={'space-between'} border='1px' borderColor={'gray.400'} borderRadius={'5px'}>
            <Box className='create-post-image'>
               <Image src={userCredential.photoURL || "https://bit.ly/3kkJrly"} />
            </Box>
            <Button variant={'outline'} w='100%' borderRadius={'10px'} onClick={onOpen} color={''}>Create Post</Button>
         </Flex>

         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Create your Post</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={2}>
                  <Stack spacing={'10px'}>
                     <FormControl className='image-input' _hover={{ bg: "#307eff" }}>
                        <FormLabel gap='10px' justifyContent={'center'} display={'flex'} className='image-input-label' alignItems='center'><MdUpload />Choose the Image</FormLabel>
                        <Input ref={imageRef} type='file' visibility={'hidden'} />
                     </FormControl>
                     <FormControl >
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Title' ref={titleRef} />
                     </FormControl>
                     <FormControl >
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Description' ref={descRef} />
                     </FormControl>
                  </Stack>
                  {error && <Box className='post-error' color={'red.300'} letterSpacing='1px'>
                     <Text>Please fill all fields</Text>
                  </Box>}
               </ModalBody>
               <ModalFooter>
                  <Button onClick={onCreatePost} colorScheme='#025bee' _hover={{ bg: "#307eff" }} bg='#025bee' mr={3}>
                     Create Post
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

export default Createpost