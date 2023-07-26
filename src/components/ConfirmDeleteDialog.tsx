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
} from "@/components/ui/alert-dialog";
import { MessageProps } from "@/types";
import axios, { AxiosError } from "axios";
import { Trash } from "lucide-react";

import React from "react";

const ConfirmDeleteDialog = ({ message }:{ message: MessageProps }) => {
  const deleteMessage = async () => {
    try {
      await axios.delete("/api/message/delete", {
        data: {
          score: message.timestamp,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      throw new Error("Oops something went wrong " + err.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="w-[20px] h-[15px] cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteMessage}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
