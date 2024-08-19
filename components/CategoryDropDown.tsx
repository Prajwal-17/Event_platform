"use client"

import React, { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "./ui/input"

type CategoryDropDownProps = {
  categories: string[],
  selectedCategory: string,
  setSelectedCategory: (selectedCategory: string) => void,
  addNewCategory: (newCategory: string) => void,
}


export function CategoryDropDown(
  {
    categories,
    addNewCategory,
    selectedCategory,
    setSelectedCategory,
  }: CategoryDropDownProps) {

  const [newCategory, setNewCategory] = useState("")

  const handleNewCategory = () => {
    if (newCategory) {
      addNewCategory(newCategory);
      setNewCategory("");
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedCategory || "Category"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {
            categories.map((tag, index) => (
              <DropdownMenuCheckboxItem
                checked={selectedCategory === tag}
                onCheckedChange={() => setSelectedCategory(tag)}
                key={index}  >
                {tag}
              </DropdownMenuCheckboxItem>
            ))
          }
          <AlertDialog>
            <AlertDialogTrigger>Add New Category</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <Input
                  type="text"
                  name="category"
                  value={newCategory}
                  onChange={(e) => { setNewCategory(e.target.value) }}
                />
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleNewCategory} >Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  )
}
