"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({id}) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/collections/${id}`, {
        method:"DELETE",
      })

      if(res.ok) {
        setLoading(false)
        window.location.href= ("/collections")
        toast.success("Категория удалена")
      }
    } catch (err){
      console.log(err)
      toast.error("Что-то пошло не так! Пожалуйста, попробуйте еще раз")
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className='bg-red-1 text-white'>
            <Trash className='h-4 w-4' />
        </Button> 
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить.Это приведет к удалению категории.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  
    
  )
}

export default Delete