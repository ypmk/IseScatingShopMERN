"use client"

import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import Delete from '../cusctom ui/Delete'
import Link from 'next/link'

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Название",
      cell: ({row}) => (<Link href={`/collections/${row.original._id}`} className="hover:text-red-1">{row.original.title}</Link>)
    },
    {
      accessorKey: "products",
      header: "Товары",
      cell:({row}) => <p>{row.original.products.length}</p>
    },
    {
    id:"actions",
    cell: ({row})=> <Delete id={row.original._id}/>
    },
  ]