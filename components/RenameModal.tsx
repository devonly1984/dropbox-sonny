"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase.config";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

export function RenameModal() {
  const { user } = useUser();
  const [input,setInput] = useState("");
  const [ fileId,filename,isRnameModalOpen,setIsRenameModalOpen ] =
    useAppStore((state) => [
        state.fileId,
        state.filename,
        state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      
    ]);
  const renameFile = async () => {
    const toastId = toast.loading("Renaming...");
    if (!user || !fileId) return;
   
   await updateDoc(doc(db, "users", user.id, "files", fileId), {
     filename: input,
   });
   toast.success("Renamed Successfully", {
     id: toastId,
   });
    setInput("");
    setIsRenameModalOpen(false);
  };
  return (
    <Dialog
      open={isRnameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename the File</DialogTitle>
          <Input id="link"
          defaultValue={filename}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDownCapture={(e)=>{
            if (e.key === 'Enter') {
                renameFile()
            }
           }}
          />
        </DialogHeader>

        <DialogFooter className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
