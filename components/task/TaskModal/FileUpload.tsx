import { VFC, useRef, useState, useCallback, ChangeEvent } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  FormControl,
  Box,
  Input,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

type Props = {
  isOpen: AlertDialogProps['isOpen'];
  onClose: AlertDialogProps['onClose'];
};

const FileUpload: VFC<Props> = ({ onClose, isOpen }) => {
  const cancelRef = useRef();

  // ドロップからアップロード
  const onDrop = useCallback((acceptedFiles) => {
    handleUpload(acceptedFiles[0] as File);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // クリックからアップロード
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleUpload(files[0]);
  };

  // アップロード実処理
  const handleUpload = (file: File) => {
    console.log(file);
  };

  // モーダルを閉じる
  const handleClose = () => {
    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={handleClose}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>ファイルアップロード</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Box
            h="40"
            m="0"
            border="dashed 2px gray"
            rounded="md"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...getRootProps()}
          >
            ドラッグ＆ドロップ
            <Input {...getInputProps()} size="md" onChange={handleInput} />
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleClose}>
            キャンセル
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FileUpload;
