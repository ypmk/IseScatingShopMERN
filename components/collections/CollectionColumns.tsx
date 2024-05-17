"use client"

import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import Delete from '../cusctom ui/Delete'

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Название",
      cell: ({row}) => <p>{row.original.title}</p>
    },
    {
      accessorKey: "products",
      header: "Товары",
      cell:({row}) => <p>{row.original.products.length}</p>
    },
    {
    id:"actions",
    cell: ({row})=> <Delete />
    },
  ]