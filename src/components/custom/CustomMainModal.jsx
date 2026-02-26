import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CustomMainModal({
  trigger,
  title = "",
  description = "Anyone who has this link will be able to view this.",
  Content,
  submitHandler,
  submitBtnName = "Submit",
  footerNeeded = true,
  open,
  onOpenChange,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-max">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {Content && Content}
        {footerNeeded && (
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant={"ghost"}
                size={"lg"}
                // className={`cursor-pointer border-2 hover:bg-primary/50 hover:text-muted !p-6`}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              size={"lg"}
              // className={`cursor-pointer !p-6 `}
              onClick={submitHandler}
            >
              {submitBtnName}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
