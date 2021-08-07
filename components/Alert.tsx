import { VFC, useRef } from 'react';
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
  ButtonProps,
} from '@chakra-ui/react';

type Props = {
  headerText: string;
  bodyText: string;
  cancelText?: string;
  cancelAble?: unknown;
} & Partial<AlertDialogProps>;

const Alert: VFC<Props> = ({
  children,
  headerText,
  bodyText,
  cancelText,
  onClose,
  isOpen,
  leastDestructiveRef,
  motionPreset,
  isCentered,
  cancelAble = true,
  ...props
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      motionPreset={motionPreset ? motionPreset : 'slideInBottom'}
      onClose={onClose}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      isCentered={isCentered ? isCentered : true}
      {...props}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{headerText}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{bodyText}</AlertDialogBody>
        <AlertDialogFooter>
          {cancelAble && (
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText ? cancelText : 'キャンセル'}
            </Button>
          )}
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
