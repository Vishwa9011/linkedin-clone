import React from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Image, Box, Flex, Text, } from '@chakra-ui/react'
import { CalcTime } from '../../helper/helper'
import { IUser } from '../../Constants/constant'
import { Link } from 'react-router-dom';

type Props = {
     users: IUser[]
}

const SearchTable = ({ users }: Props) => {
     return (
          <TableContainer bg='whiteAlpha.800'>
               <Table variant='simple'>
                    <Tbody>
                         {users && users.map((user) => (
                              <Tr borderBottom={'1px'} p='' key={user._id}>
                                   <Td>
                                        <Flex as={Link} to={`/user/${user._id}`} align={'center'} p='' gap={'3'}>
                                             <Box className={user ? 'online' : "offline"}>
                                                  <Box className='post-header-image'>
                                                       <Image src={user.photoURL || "https://bit.ly/3kkJrly"} />
                                                  </Box>
                                             </Box>
                                             <Box w='180px' overflow={'hidden'} lineHeight='1'>
                                                  <Text whiteSpace={'nowrap'} fontWeight='semibold' cursor={'pointer'} textTransform={"capitalize"} _hover={{ textDecor: "underline" }}>{user.username}</Text>
                                                  <Text whiteSpace={'nowrap'} fontSize='.8em' className='text-elipsis' textTransform={"capitalize"}>{user.email} </Text>
                                                  <Text fontSize='.7em' color='blackAlpha.700'>
                                                       <Text as='span'>{CalcTime(user?.createdAt)}</Text>
                                                  </Text>
                                             </Box>
                                        </Flex>
                                   </Td>
                              </Tr>
                         ))}
                    </Tbody>
               </Table>
          </TableContainer>
     )


}

export default SearchTable