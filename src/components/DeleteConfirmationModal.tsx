import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  postTitle?: string;
};

export default function DeleteConfirmationModal({ open, onClose, onConfirm, loading, postTitle }: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Delete Post</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete {postTitle ? `"${postTitle}"` : 'this post'}? This action cannot be undone.
        </p>
        <DialogFooter>
          <Button type="button" className="cursor-pointer bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" className="cursor-pointer bg-red-600 hover:bg-red-700 text-white" variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 