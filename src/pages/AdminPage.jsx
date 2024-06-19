import React, { useEffect, useState } from 'react'
import CategoryForm from '../components/CategoryForm'
import { Table } from "flowbite-react";
import * as userService from "../services/authService"
import { useSelector } from "react-redux";

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const loadUsers = async () => {
    try{
      const res = await userService.getAllUsers(token)
      setUsers(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const aciveDefiner = (active) => {
    if(active){
      return "Aktyvus"
    }else {
      return "Uzblokuotas"
    }
  }

  const blockUser = async (id) => {
    const activeStatus = {active : false}
    try{
      const res = await userService.blockUser(id, activeStatus, token)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    loadUsers()
  },[])
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row overflow-x-auto">
      <CategoryForm/>
      <br/>
      <Table>
        <Table.Head>
          <Table.HeadCell>Vartotojas</Table.HeadCell>
          <Table.HeadCell>Ar aktyvus</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Blokuoti</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
          <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{aciveDefiner(user.active)}</Table.Cell>
            <Table.Cell onClick={() => {blockUser(user._id)}} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Blokuoti
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default AdminPage