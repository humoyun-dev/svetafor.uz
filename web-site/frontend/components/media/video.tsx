import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { twMerge } from "tailwind-merge";

interface VideoProps {
  video?: string;
  className?: string;
  open: boolean;
  setOpen: any;
}

const Video: React.FC<VideoProps> = ({ video, className, open, setOpen }) => {
  return (
    <Dialog
      modal={true}
      onOpenChange={() => setOpen((open: boolean) => !open)}
      open={open}
    >
      <DialogContent className={`w-[]`}>
        <video
          width={500}
          height={500}
          className={twMerge(`w-full h-full`, className)}
          controls
          src={video}
        ></video>
      </DialogContent>
    </Dialog>
  );
};

export default Video;
