    import {
      Table,
      Thead,
      Tbody,
      Tfoot,
      Tr,
      Th,
      Td,
      TableCaption,
      TableContainer,
      Drawer,
      DrawerBody,
      DrawerFooter,
      DrawerHeader,
      DrawerOverlay,
      DrawerContent,
      DrawerCloseButton,
      Box,
      FormLabel,
      Input,
      InputGroup,
      InputLeftAddon,
      InputRightAddon,
      Select,
      Stack,
      Textarea,
      IconButton,
      Avatar,

      CloseButton,

      HStack,
      VStack,
      Icon,
      useDisclosure,
    } from '@chakra-ui/react'
    'use client'

    import { Button, Flex } from '@chakra-ui/react'
    import React from 'react'
    import DrawerExample from '../pages/Drawer'


    const TableContainerDate = () => {
      const { isOpen, onOpen, onClose } = useDisclosure()
      return (
        <>
          <DrawerExample isOpen={isOpen} onClose={onClose}/>
          <TableContainer >
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>People</Th>
                  <Th>Description</Th>
                  <Th isNumeric>Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
              </Tbody>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>      
                    <Flex justifyContent="center" alignItems="center">
                    <Button

                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow me
                </Button>
                <Button

                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                m={5}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Follow me
                </Button>
                    <Button  m={4} colorScheme='teal' rounded={'full'} onClick={onOpen}>
              Search
            </Button>
                  </Flex>

                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )
    }

    export default TableContainerDate
